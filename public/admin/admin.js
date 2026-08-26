const REPO = 'Tappi74/Tappi74.github.io';
const BRANCH = 'master';
const API = `https://api.github.com/repos/${REPO}/contents/`;
const state = { token: sessionStorage.getItem('floun_github_token') || '', posts: [], references: [], editingPost: null };
const $ = (id) => document.getElementById(id);

function headers() { return { Accept: 'application/vnd.github+json', Authorization: `Bearer ${state.token}`, 'X-GitHub-Api-Version': '2022-11-28' }; }
function decode(value) { return decodeURIComponent(Array.from(atob(value.replace(/\n/g, ''))).map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join('')); }
function encode(value) { return btoa(unescape(encodeURIComponent(value))); }
function slugify(value) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function setSaving(text, error = false) { $('save-state').textContent = text; $('save-state').style.color = error ? '#a32828' : ''; }

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}${options.method ? '' : `?ref=${BRANCH}`}`, { ...options, headers: { ...headers(), ...(options.headers || {}) } });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || `GitHub-virhe ${response.status}`);
  return response.status === 204 ? null : response.json();
}
async function readJson(path) { const file = await api(path); return JSON.parse(decode(file.content)); }
async function saveFile(path, content, message) {
  let sha;
  try { sha = (await api(path)).sha; } catch (error) { if (!error.message.includes('Not Found')) throw error; }
  return api(path, { method: 'PUT', body: JSON.stringify({ message, content: encode(content), branch: BRANCH, ...(sha ? { sha } : {}) }) });
}

async function connect(token) {
  state.token = token.trim();
  const userResponse = await fetch('https://api.github.com/user', { headers: headers() });
  if (!userResponse.ok) throw new Error('Käyttöavain ei kelpaa. Tarkista avain ja sen oikeudet.');
  const user = await userResponse.json();
  [state.posts, state.references] = await Promise.all([readJson('public/content/posts.json'), readJson('public/content/references.json')]);
  sessionStorage.setItem('floun_github_token', state.token);
  $('user').textContent = `Kirjautunut: ${user.login}`;
  $('login').classList.add('hidden'); $('editor').classList.remove('hidden'); $('logout').classList.remove('hidden');
  renderPosts(); renderReferences();
}

function renderPosts() {
  const list = $('post-list'); list.innerHTML = '';
  if (!state.posts.length) list.innerHTML = '<div class="item"><div><h3>Ei vielä kirjoituksia</h3><p>Luo ensimmäinen blogikirjoitus yllä olevasta painikkeesta.</p></div></div>';
  state.posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((post) => {
    const item = document.createElement('article'); item.className = 'item';
    item.innerHTML = `<div><h3>${escapeHtml(post.title)}</h3><p>${new Date(post.date).toLocaleDateString('fi-FI')} · ${post.published === false ? 'Luonnos' : 'Julkaistu'}</p></div><div class="item-actions"><button>Muokkaa</button></div>`;
    item.querySelector('button').onclick = () => openPost(post); list.appendChild(item);
  });
}
function renderReferences() {
  const list = $('reference-list'); list.innerHTML = '';
  state.references.forEach((reference, index) => {
    const item = document.createElement('article'); item.className = 'item reference-edit'; item.draggable = true; item.dataset.index = index;
    item.innerHTML = `<input aria-label="Yrityksen nimi" value="${escapeAttr(reference.name)}" placeholder="Yritys"><input aria-label="Yhteistyövuodet" value="${escapeAttr(reference.years || '')}" placeholder="2015—"><input aria-label="Kuvaus" value="${escapeAttr(reference.description || '')}" placeholder="Lyhyt kuvaus"><label class="check"><input type="checkbox" ${reference.visible === false ? '' : 'checked'}> Näkyvissä</label><div class="item-actions"><button class="up" aria-label="Siirrä ylös">↑</button><button class="down" aria-label="Siirrä alas">↓</button><button class="danger">Poista</button></div>`;
    const inputs = item.querySelectorAll('input');
    inputs[0].oninput = (event) => reference.name = event.target.value; inputs[1].oninput = (event) => reference.years = event.target.value; inputs[2].oninput = (event) => reference.description = event.target.value; inputs[3].onchange = (event) => reference.visible = event.target.checked;
    item.querySelector('.up').onclick = () => moveReference(index, -1); item.querySelector('.down').onclick = () => moveReference(index, 1); item.querySelector('.danger').onclick = () => { if (confirm('Poistetaanko referenssi?')) { state.references.splice(index, 1); renderReferences(); } };
    item.ondragstart = (event) => event.dataTransfer.setData('text/plain', index); item.ondragover = (event) => event.preventDefault(); item.ondrop = (event) => { event.preventDefault(); const from = Number(event.dataTransfer.getData('text/plain')); const [moved] = state.references.splice(from, 1); state.references.splice(index, 0, moved); renderReferences(); };
    list.appendChild(item);
  });
}
function moveReference(index, direction) { const target = index + direction; if (target < 0 || target >= state.references.length) return; [state.references[index], state.references[target]] = [state.references[target], state.references[index]]; renderReferences(); }
function escapeHtml(value = '') { const element = document.createElement('div'); element.textContent = value; return element.innerHTML; }
function escapeAttr(value = '') { return escapeHtml(value).replace(/"/g, '&quot;'); }

function openPost(post = null) {
  state.editingPost = post;
  $('post-id').value = post?.id || ''; $('post-title').value = post?.title || ''; $('post-date').value = post?.date || new Date().toISOString().slice(0, 10); $('post-author').value = post?.author || 'Floun Oy'; $('post-excerpt').value = post?.excerpt || ''; $('post-content').value = post?.content || ''; $('post-published').checked = post?.published !== false; $('post-image').value = ''; $('delete-post').classList.toggle('hidden', !post); $('post-dialog').showModal();
}
async function uploadImage(file, slug) {
  if (!file) return state.editingPost?.image || '';
  const extension = file.name.split('.').pop().toLowerCase(); const path = `public/content/uploads/${slug}-${Date.now()}.${extension}`;
  const data = new Uint8Array(await file.arrayBuffer()); let binary = ''; data.forEach((byte) => binary += String.fromCharCode(byte));
  await api(path, { method: 'PUT', body: JSON.stringify({ message: `Lisää blogikuva: ${slug}`, content: btoa(binary), branch: BRANCH }) });
  return `/content/uploads/${path.split('/').pop()}`;
}

$('connect').onclick = async () => { $('login-error').textContent = ''; $('connect').disabled = true; try { await connect($('token').value); } catch (error) { $('login-error').textContent = error.message; state.token = ''; } finally { $('connect').disabled = false; } };
$('logout').onclick = () => { sessionStorage.removeItem('floun_github_token'); location.reload(); };
$('new-post').onclick = () => openPost();
$('new-reference').onclick = () => { state.references.push({ id: `reference-${Date.now()}`, name: '', years: '', description: '', visible: true }); renderReferences(); };
document.querySelectorAll('.tabs button').forEach((button) => button.onclick = () => { document.querySelectorAll('.tabs button').forEach((item) => item.classList.toggle('active', item === button)); $('posts-panel').classList.toggle('hidden', button.dataset.tab !== 'posts'); $('references-panel').classList.toggle('hidden', button.dataset.tab !== 'references'); });
$('save-references').onclick = async () => { setSaving('Tallennetaan…'); try { await saveFile('public/content/references.json', `${JSON.stringify(state.references, null, 2)}\n`, 'Päivitä referenssit'); setSaving('Tallennettu – julkaisu käynnistyi'); } catch (error) { setSaving(error.message, true); } };
$('post-form').onsubmit = async (event) => { event.preventDefault(); setSaving('Tallennetaan…'); const title = $('post-title').value.trim(); let slug = state.editingPost?.slug || slugify(title); if (!slug) slug = `kirjoitus-${Date.now()}`; try { const image = await uploadImage($('post-image').files[0], slug); const post = { id: state.editingPost?.id || `post-${Date.now()}`, slug, title, date: $('post-date').value, author: $('post-author').value.trim() || 'Floun Oy', excerpt: $('post-excerpt').value.trim(), content: $('post-content').value.trim(), image, published: $('post-published').checked }; if (state.editingPost) Object.assign(state.editingPost, post); else state.posts.push(post); await saveFile('public/content/posts.json', `${JSON.stringify(state.posts, null, 2)}\n`, `Päivitä blogi: ${title}`); $('post-dialog').close(); renderPosts(); setSaving('Tallennettu – julkaisu käynnistyi'); } catch (error) { setSaving(error.message, true); } };
$('delete-post').onclick = async () => { if (!state.editingPost || !confirm('Poistetaanko kirjoitus pysyvästi?')) return; state.posts = state.posts.filter((post) => post.id !== state.editingPost.id); try { await saveFile('public/content/posts.json', `${JSON.stringify(state.posts, null, 2)}\n`, `Poista blogikirjoitus: ${state.editingPost.title}`); $('post-dialog').close(); renderPosts(); setSaving('Kirjoitus poistettu – julkaisu käynnistyi'); } catch (error) { setSaving(error.message, true); } };

if (state.token) connect(state.token).catch(() => { sessionStorage.removeItem('floun_github_token'); state.token = ''; });

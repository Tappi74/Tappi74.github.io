import { useEffect, useState } from 'react';
import './App.css';
import logo from './images/FlounLogo.jpg';
import heroPicture from './images/heroPicture.png';

const services = [
  ['01', 'Sulautetut järjestelmät', 'Mikrokontrollerien ohjelmointi C:llä ja assemblerilla – yksinkertaisista 8-bittisistä ratkaisuista vaativiin 32-bittisiin järjestelmiin.'],
  ['02', 'Ohjelmistokehitys', 'PC-, mobiili- ja automaatio-ohjelmistot: Windows (C, VB.NET, C#), Android, iOS sekä ohjelmoitavat logiikat IEC 61131-3 -standardin mukaisesti.'],
  ['03', 'Elektroniikka & mekaniikka', 'Piirilevyjen suunnittelu ja toteutus, mekaniikka- ja 3D-suunnittelu sekä kokonaisuuden yhteensovitus toimivaksi tuotteeksi.'],
  ['04', 'Tuotekehitys', 'Reverse engineering, teollinen muotoilu, tuotteistamispalvelut ja käytännönläheinen tuki ideasta valmiiksi ratkaisuksi.'],
  ['05', 'Konsultointi', 'Hankekoordinointi ja liikkeenjohdon konsultointi teknologiahankkeisiin, joissa kokonaisuus ratkaisee.'],
  ['06', 'IoT-ratkaisut', 'Yhdistämme laitteet, ohjelmistot ja pilvipalvelut hallituiksi ratkaisuiksi, jotka tukevat asiakkaan toimintaa.'],
];

const fallbackReferences = [['Trendion', '2014—'], ['Clothing+', '2005–2013'], ['Decido', '2015—'], ['WM-Plast', '2015—'], ['TappIT Services', '2012—'], ['Jalava', '2013–2014']];
const contacts = [
  ['Matti-Pekka Korkeala, DI', 'Hallinto ja talous', '+358 50 342 7462', 'matti-pekka.korkeala'],
  ['Tapio Karinsalo, DI', 'Ohjelmisto- ja tuotekehitys', '+358 50 518 8074', 'tapio.karinsalo'],
  ['Aki Halme, DI', 'Elektroniikka- ja tuotekehitys', '+358 40 581 0336', 'aki.halme'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [references, setReferences] = useState(fallbackReferences.map(([name, years]) => ({ name, years, visible: true })));
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/content/references.json`).then((response) => response.ok ? response.json() : Promise.reject()),
      fetch(`${process.env.PUBLIC_URL}/content/posts.json`).then((response) => response.ok ? response.json() : Promise.reject()),
    ]).then(([referenceData, postData]) => {
      setReferences(referenceData);
      const published = postData.filter((post) => post.published !== false).sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(published);
      const slug = window.location.hash.startsWith('#blog/') ? window.location.hash.slice(6) : '';
      if (slug) setActivePost(published.find((post) => post.slug === slug) || null);
    }).catch(() => {});
  }, []);
  useEffect(() => {
    const onHash = () => {
      const slug = window.location.hash.startsWith('#blog/') ? window.location.hash.slice(6) : '';
      setActivePost(slug ? posts.find((post) => post.slug === slug) || null : null);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [posts]);
  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="brand" href="#alkuun" aria-label="Floun Oy – etusivu"><img src={logo} alt="Floun Oy" /></a>
      <button className="menu-button" aria-label="Avaa valikko" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Päävalikko">
        <a href="#palvelut" onClick={closeMenu}>Palvelut</a><a href="#smartest" onClick={closeMenu}>SmarTEST</a>{posts.length > 0 && <a href="#blogi" onClick={closeMenu}>Blogi</a>}<a href="#referenssit" onClick={closeMenu}>Referenssit</a><a className="nav-cta" href="#yhteys" onClick={closeMenu}>Ota yhteyttä</a>
      </nav>
    </header>
    <main>
      <section className="hero" id="alkuun"><div className="hero-glow" />
        <div className="hero-copy"><p className="eyebrow">Teknologiaa, joka toimii käytännössä</p><h1>Ideasta<br /><span>toimivaksi tuotteeksi.</span></h1><p className="hero-lead">Suunnittelemme ohjelmistot, elektroniikan ja sulautetut järjestelmät yhtenä kokonaisuutena. Saat kokeneen kumppanin ideasta valmiiseen ratkaisuun.</p><div className="hero-actions"><a className="button button--primary" href="#yhteys">Keskustellaan projektistasi <span>↗</span></a><a className="text-link" href="#palvelut">Tutustu osaamiseemme <span>↓</span></a></div></div>
        <div className="hero-visual"><div className="image-frame"><img src={heroPicture} alt="Moderni piirilevy ja mikroprosessori" /></div><div className="hero-badge"><strong>8–32</strong><span>bitin järjestelmät<br />ja kaikki siltä väliltä</span></div></div>
        <div className="hero-foot"><span>Kankaanpää · Finland</span><span>Ohjelmistot · Elektroniikka · IoT</span></div>
      </section>
      <section className="intro section-pad"><p className="section-kicker">Floun Oy</p><div className="intro-grid"><h2>Kun laitteen täytyy tehdä juuri se, mitä on luvattu.</h2><div><p>Tarjoamme konsultointi-, suunnittelu- ja toteutuspalveluja sulautettujen järjestelmien, automaation ja tietotekniikan saralla.</p><p>Monialainen osaamisemme yhdistää ohjelmiston, elektroniikan ja mekaniikan. Näemme koko tuotteen – emme vain yksittäistä osaa.</p></div></div></section>
      <section className="services section-pad" id="palvelut"><div className="section-heading"><div><p className="section-kicker">Palvelut</p><h2>Tekninen kumppani<br />koko matkalle.</h2></div><p>Autamme rajaamaan oikean ongelman, valitsemaan järkevän teknologian ja viemään ratkaisun maaliin asti.</p></div><div className="service-grid">{services.map(([number, title, text]) => <article className="service-card" key={number}><span className="service-number">{number}</span><div className="service-icon" aria-hidden="true">{['⌁','{ }','◇','✦','↗','◎'][Number(number)-1]}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="smartest section-pad" id="smartest"><div className="smartest-mark" aria-hidden="true"><div className="probe-line" /><div className="probe-dot" /><span>SMART<br />TEST</span></div><div className="smartest-copy"><p className="section-kicker">Oma tuote</p><h2>Laaduntarkastus, joka ohjaa tekijää.</h2><p>Floun Oy:n kehittämä SmarTEST-menetelmä perustuu tietokonepohjaiseen testauksen suunnitteluun ja älykkään mittapään käyttöön. Se tehostaa kojeistojen ja sähkökaappien kytkentöjen laaduntarkastusta ja vähentää inhimillisiä virheitä.</p><p>Yksittäiskappaleissa etu on virheettömyys. Sarjoissa hyödyt kasvavat merkittäväksi ajansäästöksi – jo piensarjoissa läpimenoaika voi lyhentyä kymmeniä prosentteja.</p><ul><li><span>✓</span> Testaajan ei tarvitse osata lukea kytkentäkaavioita</li><li><span>✓</span> Nopeampi testaus, erityisesti useamman tuotteen sarjoissa</li><li><span>✓</span> Vähemmän inhimillisiä virheitä</li><li><span>✓</span> Automaattisesti syntyvä testausraportti</li></ul><a className="button button--light" href="#yhteys">Kysy SmarTESTistä <span>↗</span></a></div></section>
      {posts.length > 0 && <section className="blog section-pad" id="blogi"><div className="section-heading"><div><p className="section-kicker">Blogi</p><h2>Ajatuksia<br />tuotekehityksestä.</h2></div><p>Kokemuksia, havaintoja ja käytännön tietoa ohjelmistoista, elektroniikasta ja sulautetuista järjestelmistä.</p></div><div className="blog-grid">{posts.map((post) => <a className="blog-card" href={`#blog/${post.slug}`} key={post.id || post.slug}><div className="blog-image">{post.image ? <img src={`${process.env.PUBLIC_URL}${post.image}`} alt="" /> : <span>FLOUN / BLOGI</span>}</div><time dateTime={post.date}>{new Date(post.date).toLocaleDateString('fi-FI')}</time><h3>{post.title}</h3><p>{post.excerpt}</p><span className="read-more">Lue artikkeli ↗</span></a>)}</div></section>}
      <section className="references section-pad" id="referenssit"><div className="section-heading"><div><p className="section-kicker">Referenssit</p><h2>Pitkiä kumppanuuksia.<br />Todellisia ratkaisuja.</h2></div><p>Olemme saaneet olla mukana kehittämässä asiakkaidemme tuotteita ja liiketoimintaa useilla toimialoilla.</p></div><div className="reference-grid">{references.filter((reference) => reference.visible !== false).map((reference) => <div className="reference-item" key={reference.id || reference.name}><strong>{reference.name}</strong>{reference.description && <p>{reference.description}</p>}<span>{reference.years}</span></div>)}</div></section>
      <section className="contact section-pad" id="yhteys"><div className="contact-top"><div><p className="section-kicker">Aloitetaan keskustelu</p><h2>Onko sinulla idea<br />tai ratkaistava ongelma?</h2></div><a className="contact-mail" href="mailto:matti-pekka.korkeala@floun.fi">Lähetä viesti <span>↗</span></a></div><div className="contact-grid">{contacts.map(([name, role, phone, email]) => <article key={name}><p>{role}</p><h3>{name}</h3><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a><a href={`mailto:${email}@floun.fi`}>Sähköposti ↗</a></article>)}</div><div className="company-row"><div><strong>Floun Oy</strong><span>Sävelänkatu 25 A 1<br />38710 KANKAANPÄÄ</span></div><div><span>Y-tunnus</span><strong>2439137-6</strong></div></div></section>
    </main>
    {activePost && <div className="article-overlay" role="dialog" aria-modal="true" aria-labelledby="article-title"><a className="article-close" href="#blogi" aria-label="Sulje artikkeli">×</a><article>{activePost.image && <img className="article-image" src={`${process.env.PUBLIC_URL}${activePost.image}`} alt="" />}<p className="section-kicker">{new Date(activePost.date).toLocaleDateString('fi-FI')} · {activePost.author || 'Floun Oy'}</p><h1 id="article-title">{activePost.title}</h1><p className="article-lead">{activePost.excerpt}</p><div className="article-body">{(activePost.content || '').split(/\n\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article></div>}
    <footer><a className="brand" href="#alkuun"><img src={logo} alt="Floun Oy" /></a><p>Teknologiaa, joka toimii käytännössä.</p><span>© {new Date().getFullYear()} Floun Oy</span></footer>
  </div>;
}
export default App;

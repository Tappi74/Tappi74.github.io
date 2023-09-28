import { makeStyles } from '@mui/styles';

const styles = () => {
    return {
        toolBar: {
            height: '10vh',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            backgroundColor: 'white',
          },
          logo: {
            color: 'blue',
            cursor: 'pointer',
          },
          link: {
            color: "#000"
          },
          menuIcon: {
            color: '#000',
          }
    };
  };
   
  const useStyles = makeStyles(styles);
  export default useStyles;

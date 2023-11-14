import { makeStyles } from '@mui/styles';

const styles = () => {
    return {
        toolBar: {
            height: '10vh',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            backgroundColor: '#3B3B3D',
          },
          logo: {
            color: 'blue',
            cursor: 'pointer',
          },
          link: {
            color: "#FFFFFF"
          },
          menuIcon: {
            color: '#FFFFFF',
          },
          heroBox: {
            width: '100%',
            display: 'flex',
            minHeight: '600px',
            alignItems: 'center',
            justifyContent: 'center',
          },
          gridContainer: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1300px',
            padding: '50px',
          },
          title: {
            paddingBottom: '10px',
          },
          subtitle: {
            opacity: '0.4',
            paddingBottom: '30px',
          },
          largeImage: {
            width: '100%',
          },
          sectionGridContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '250px',
          },
          sectionGridItem: {
            backgroundColor: '#f2f0f1',
            textAlign: 'center',
            padding: '30px',
            width: '200px',
            borderRadius: '10px',
            margin: '10px !important',
          },
          footerContainer: {
            display: 'flex',
            alignItems: 'center',
            miHeight: '10vh',
            padding: '20px',
            justifyContent: 'center',
            backgroundColor: '#3B3B3D',
            flexDirection: 'column',
          },
          footerText: {
            paddingLeft: '10px',
            color: '#FFFFFF',
            fontSize: '1.0rem'
          },
          footerDate: {
            opacity: '0.4',
          },
          testimonialCard: {
            backgroundColor: '#fff',
            padding: '10px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
          },
          testimonialStatement: {
            paddingBottom: '25px',
          },
          avatar: {
            marginRight: '10px',
          },
          testimonialPosition: {
            fontSize: '14px',
            opacity: '0.6',
          },
          referencesBox: {
            marginLeft: '10px',
            paddingTop: '50px',
            paddingBottom: '50px',
            paddingLeft: '50px',
            paddingRight: '50px',
            backgroundColor: '#d9d5d4',
          },
          blogBox: {
            marginLeft: '10px',
            paddingTop: '50px',
            paddingBottom: '50px',
            paddingLeft: '50px',
            paddingRight: '50px',
            backgroundColor: '#ffffff',
          }
    };
  };
   
  const useStyles = makeStyles(styles);
  export default useStyles;

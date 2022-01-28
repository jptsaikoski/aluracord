import { Box, Text } from '@skynexui/components';
import appConfig from '../config.json';

function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }

export default function App({ Component, pageProps}) {

    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps}/>
        
        </>
    );

}

export function Window(props) {
    const windowTitle = props.windowTitle || 'Num deu';
    return (
      <>
      {/* Janela da aplicação - INICIO */}
      <Box styleSheet={{
          display: 'flex', flexDirection: 'column', 
          width: '100%', height: '100%',
          padding: '2px',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.neutrals['300'],
          border: '1px solid',
          borderColor: appConfig.theme.colors.neutrals['400'],
        }}>
        
            {/* Topo da janela - INICIO */}
            <Box
              styleSheet={{
                width: '100%', height: '28px', display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '2px', 
                paddingRight: '8px', paddingLeft: '8px'
              }}>

              <Box styleSheet={{
                width: '20px', height: '20px', minWidth: '20px',
                backgroundColor: appConfig.theme.colors.neutrals['300'], 
                borderRadius: '1px', border: '1px solid', marginRight: '8px',
                borderColor: appConfig.theme.colors.neutrals['400'],
                boxShadow: 'inset 1px 1px 2px 0px rgba(255,255,255,0.5), inset -1px -1px 2px 0px rgba(0,0,0,0.16)',}}></Box>

              {/* Meio do topo - INICIO */}
              <Box styleSheet={{
                width: '100%', height: '28px', display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between'}}>

                <div className="windowtop">
                  <div className="listra"></div>
                  <div className="listra"></div>
                  <div className="listra"></div>
                  <div className="listra"></div>
                </div>
                
                {/* Título da aplicação - INICIO */}
                <Box styleSheet={{
                  width: 'auto', height: '28px', display: 'flex',
                  justifyContent: 'center',alignItems: 'center',
                  paddingRight: '8px', paddingLeft: '8px'}}>

                  <Text 
                    variant="body3" 
                    styleSheet={{
                      whiteSpace: 'nowrap',fontSize: '16px', fontWeight: '600', 
                      color: appConfig.theme.colors.neutrals[600] }}>
                    {windowTitle}
                  </Text>

                </Box>
                {/* Título da aplicação - FIM */}

                <div className="windowtop">
                  <div className="listra"></div>
                  <div className="listra"></div>
                  <div className="listra"></div>
                  <div className="listra"></div>
                </div>

                <style jsx>{`
                  .windowtop {
                    width: 100%;
                    height: 28px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                  }
                  .listra {
                    background-color: ${appConfig.theme.colors.neutrals['400']};
                    width: 100%;
                    height: 1px;
                  }

                `}</style>

              </Box>
              {/* Meio do topo - FIM */}

              <Box styleSheet={{display: 'flex',
                width: '20px', height: '20px', minWidth: '20px',
              backgroundColor: appConfig.theme.colors.neutrals['300'], 
                borderRadius: '1px', border: '1px solid', marginLeft: '8px',
                borderColor: appConfig.theme.colors.neutrals['400'],
                boxShadow: 'inset 1px 1px 2px 0px rgba(255,255,255,0.5), inset -1px -1px 2px 0px rgba(0,0,0,0.16)',}}>
                  <Box styleSheet={{
                    width: '10px', height: '10px', 
                    borderRadius: '0px', border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals['400'],
                    marginTop: '-1px', marginLeft: '-1px'
                  }}></Box>
                </Box>

            </Box>
            {/* Topo da janela - FIM */}

        {props.children}
      </Box>
      {/* Janela da aplicação - FIM */}
      </>
    );
  }
import { Box, Text } from '@skynexui/components';
import appConfig from '../../config.json';

export function Window(props) {
    const windowTitle = props.windowTitle || 'Num deu';
    const display = props.display || 'flex';
    return (
      <>
      {/* Janela da aplicação - INICIO */}
      <div className="window">
        
            {/* Topo da janela - INICIO */}
            <Box
              styleSheet={{
                display: display,
                width: '100%', height: '28px',
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '2px', 
                paddingRight: '8px', paddingLeft: '8px',
                
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
                      whiteSpace: 'nowrap',fontSize: '16px', fontWeight: 'normal', 
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
            <Box styleSheet={{ border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals['400'],
                borderTopColor: appConfig.theme.colors.neutrals['900'],
                width: '100%', height: '100%', overflow: 'hidden'}}>

              {props.children}
            </Box>
      </div>
      <style jsx>{`
        @keyframes windowopen {
          0% {opacity: 0.5; max-width: 0px; max-height: 0px}
          70% {opacity: 1;}
          100% {max-width: 1920px; max-height: 1920px}
        }
        
        .window {
          position: relative;
          float: right;
          display: flex; flex-direction: column;
          width: 100%; height: 100%; 
          padding: 2px; 
          border-radius: 2px;
          box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
          background-color: ${appConfig.theme.colors.neutrals['300']};
          border: 1px solid;
          border-color: ${appConfig.theme.colors.neutrals['400']};
          animation: windowopen 1s ease-out;
        }
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
      {/* Janela da aplicação - FIM */}
      </>
    );
  }
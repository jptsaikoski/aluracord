import { Box, Button, Text, TextField, Image } from '@skynexui/components';
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

  function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['900']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
  }
  function Video(props) {
    const Src = props.src;
    console.log(Src);
    return (
      <>
        <video autoPlay muted loop>
          <source src={Src} type="video/mp4"/>
        </video>
        
        <style jsx>{`
              video {
                zindex: 1000;
                position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
              }
              `}</style>
      </>
    );
  }

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
    const username = 'jptsaikoski';
  
    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(/static/images/background-2.gif)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
          }}
        >

          
          <Box
            styleSheet={{
              display: 'flex', flexDirection: 'column', 
              width: '100%', maxWidth: '600px',
              padding: '2px',
              borderRadius: '2px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals['300'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['400'],
            }}
          >

            <Box
              styleSheet={{
                width: '100%', height: '28px', display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '2px', 
                paddingRight: '8px', paddingLeft: '8px'
              }}
            >

              <Box styleSheet={{width: '20px', height: '20px', 
              backgroundColor: appConfig.theme.colors.neutrals['300'], 
                borderRadius: '1px', border: '1px solid', 
                borderColor: appConfig.theme.colors.neutrals['400']}}></Box>
              <Box styleSheet={{width: '20px', height: '20px', 
              backgroundColor: appConfig.theme.colors.neutrals['300'], 
                borderRadius: '1px', border: '1px solid', 
                borderColor: appConfig.theme.colors.neutrals['400']}}></Box>

            </Box>
            <Box
              styleSheet={{
                padding: '32px',
                borderRadius: '2px',
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals['400'],
                borderTopColor: appConfig.theme.colors.neutrals['900'],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                backgroundColor: appConfig.theme.colors.neutrals['100'],
                width: '100%', top: '0', left: '0', bottom: '0', right: '0',
              }}
            >

            {/* Formulário */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[400] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                fullWidth
                rounded='none'
                styleSheet={{
                  borderRadius: '2px',
                  boxShadow: 'inset 2px 3px 1px 0px rgba(0,0,0,0.16)',
                }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[900],
                    mainColor: appConfig.theme.colors.neutrals[400],
                    mainColorHighlight: appConfig.theme.colors.neutrals['900'],
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                rounded='none'
                styleSheet={{
                  backgroundColor: appConfig.theme.colors.neutrals['100'],
                  borderRadius: '2px',
                  border: '1px solid',
                  borderTopColor: appConfig.theme.colors.neutrals['400'],
                  borderLeftColor: appConfig.theme.colors.neutrals['400'],
                  borderRightColor: appConfig.theme.colors.neutrals['400'],
                  borderBottomColor: appConfig.theme.colors.neutrals['400'],
                  boxShadow: 'inset 2px 3px 1px 0px rgba(255,255,255,1), inset -2px -3px 1px 0px rgba(0,0,0,0.16)',
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["900"],
                  mainColor: appConfig.theme.colors.neutrals['100'],
                  mainColorLight: appConfig.theme.colors.neutrals['100'],
                  mainColorStrong: appConfig.theme.colors.neutrals['200'],
                }}
              />
            </Box>
            {/* Formulário */}

            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '36px',
                backgroundColor: appConfig.theme.colors.neutrals[100],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[400],
                borderRadius: '2px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '2px',
                  marginBottom: '16px',
                  border: '1px solid',
                  borderColor: appConfig.theme.colors.neutrals['400']
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[900],
                  backgroundColor: '',
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}

            </Box>
  
  
          </Box>
        </Box>
      </>
    );
  }
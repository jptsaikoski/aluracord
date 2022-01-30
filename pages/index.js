import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { Window } from './_app.js';

  function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['900']};
                  font-size: 24px;
                  font-weight: normal;
                  margin-bottom: 23px;
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
    const [username, setUsername] = React.useState('jptsaikoski');
    const [usernameValid, setUsernameValid] = React.useState('jptsaikoski');
    const [test, setTest] = React.useState([]);
    const [userData, setUserData] = React.useState({name: '', followers: 0, location: ''});
    
    /*React.useEffect(function () {

      fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        console.log(userData);
      });

    },[])*/

    /*fetch(`https://api.github.com/users/${usernameValid}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUserData(data);
            console.log('O user é: ', userData);
          });*/

    function getUserData(valor) {
      console.log(test);

      test.forEach(function (timer) {
        clearTimeout(timer);
      })

      setTest([
        setTimeout(function () {
          fetch(`https://api.github.com/users/${valor}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUserData(data);
            console.log('O user é: ', data);
          });
          
        }, 2000), ...test,
      ]);
      


    }

    function changeName(param) {
      if (param.length > 2) {
        setUsernameValid(param);
      } else {
        setUsernameValid('');
      }
    }
    const roteamento = useRouter();
    

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(/static/images/background-1280.gif)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
            padding: {
              xs: '24px',
              md: '48px',
            }
          }}>
          
          <Box styleSheet={{
            width: '100%', maxWidth: '600px',
          }}>
          <Window windowTitle={appConfig.name}>

            
            
            {/* Conteúdo - INICIO */}
            <Box
              styleSheet={{
                padding: '32px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                backgroundColor: appConfig.theme.colors.neutrals['100'],
                width: '100%', top: '0', left: '0', bottom: '0', right: '0',
              }}>

              {/* Formulário */}
              <Box
                as="form"
                onSubmit={function (event) {
                  event.preventDefault();
                  roteamento.push(`/chat?username=${username}`);
                }}
                styleSheet={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                }}>
                <Titulo tag="h2">Bem vindo de volta!</Titulo>
                
                

                <TextField
                  fullWidth
                  rounded='none'
                  value={username}
                  onChange={function (event) {
                    const valor = event.target.value;
                    setUsername(valor);
                    changeName(valor);
                    getUserData(valor);

                  }}
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
                  padding: '32px',
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                  border: '1px solid',
                  borderColor: appConfig.theme.colors.neutrals[400],
                  borderRadius: '2px',
                  flex: 1,
                  minHeight: '240px',
                }}>
                <Image
                  styleSheet={{
                    borderRadius: '2px',
                    marginBottom: '16px',
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals['400']
                  }}
                  src={`https://github.com/${usernameValid}.png`}/>
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[900],
                    backgroundColor: '',
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                  {userData.name || usernameValid}
                  
                </Text>
                <Text styleSheet={{marginBottom: '3px', fontSize: '14px'}}>Seguidores: {userData.followers}</Text>
                <Text styleSheet={{marginBottom: '3px', fontSize: '14px'}}>{userData.location}</Text>
              </Box>
              {/* Photo Area */}

            </Box>
            {/* Conteúdo - FIM */}

          </Window>
          </Box>
        </Box>
      </>
    );
  }


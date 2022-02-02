import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { supabaseClient } from '../src/components/Supabase';
import appConfig from '../config.json';
import { Window } from '../src/components/Window';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { MenuBar } from '../src/components/MenuBar';

export default function ProfilePage() {
    const routing = useRouter();
    const loggedUser = routing.query.username;
    const [counter, setCounter] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [userData, setUserData] = React.useState({name: '', followers: 0, location: '', bio: ''});
    const [gifUrl, setGifUrl] = React.useState('/static/images/frame-1.png');

    React.useEffect(() => {
        if (counter < 10) {

            if (loggedUser != undefined && loggedUser != null && loggedUser != '' && loggedUser != 'undefined') {
                fetch(`https://api.github.com/users/${loggedUser}`)
                      .then((response) => {
                        return response.json();
                      })
                      .then((data) => {
                        setUserData(data);
                      });
                  
                    //setIsLoaded(!isLoaded);
                    changeBackground();
            } else {
                setCounter(counter + 1);
            }

        } else {

            alert('Você precisa estar logado para acessar essa página.');
            routing.push('/');

        }

    },[counter]);

    function changeBackground() { 

        const randomNumber = Math.floor(Math.random() * 3);

        if (gifUrl.endsWith(".gif")) {
            setGifUrl(`/static/images/frame-${randomNumber}.png`);
        } else {
            setGifUrl('/static/images/background-1280-30.gif');

            const gifTimer = setTimeout(function() {
                setGifUrl(`/static/images/frame-${randomNumber}.png`);
            }, 2000)
        }    
       }

    return (
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
            flexDirection: {
                xs: 'column',
                lg: 'row',
            }, 
            backgroundColor: '#091B15',
            backgroundImage: `url(${gifUrl})`, minHeight: '100%',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', maxHeight: {xs: 'calc(100vh + 72px + 16px)',lg:'100vh'},
            transition: 'all 0.05s',
            padding: {
                xs: '24px',
                md: '48px',
            },
          }}>

            <MenuBar loggedUser={loggedUser}/>

            <Box 
            styleSheet={{
                height: '100%',
                maxHeight: {
                    xs: 'calc(100% - 72px - 16px)',
                    lg: '100%'
                },
                width: '100%',
                maxWidth: {
                    xs: '100%',
                    md: '800px',
                },
            }}>
                <Window windowTitle='Seu Perfil' 
                styleRules={{}}
                closeButton={() => {
                    routing.push(`/`);
                }}>

                    <Box
                    styleSheet={{
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: appConfig.theme.colors.neutrals[100],
                        height: '100%',
                        maxHeight: '100%',
                        width: '100%',
                        padding: {
                            xs: '16px',
                            lg: '32px',
                        },
                    }}>
                        
                        <Box styleSheet={{
                            width: '100%',
                            maxHeight: '100%',
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                lg: 'row'
                            }
                        }}>

                            <Box
                            styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: {
                                xs: '100%',
                                lg: '50%'
                            },
                            maxHeight: '100%',
                            padding: '16px',
                            }}>
                            <Image
                            styleSheet={{
                                width: '200px',
                                borderRadius: '2px',
                                marginBottom: '16px',
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals['400']
                            }}
                            src={`https://github.com/${loggedUser}.png`}/>
                            </Box>

                            <Box 
                            tag='ul'
                            styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            padding: '16px',
                            }}>

                            <Box
                            tag='li'
                            styleSheet={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '6px'
                            }}>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["400"],
                                fontWeight: 'normal',
                                }}>
                                Nome: 
                                </Text>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["700"],
                                fontWeight: 'normal',
                                }}>
                                {userData.name || '-'}
                                </Text>

                            </Box>

                            <Box
                            tag='li'
                            styleSheet={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '6px'
                            }}>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["400"],
                                fontWeight: 'normal',
                                }}>
                                Bio: 
                                </Text>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["700"],
                                fontWeight: 'normal',
                                }}>
                                {userData.bio || '-'}
                                </Text>

                            </Box>

                            <Box
                            tag='li'
                            styleSheet={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '6px'
                            }}>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["400"],
                                fontWeight: 'normal',
                                }}>
                                Username: 
                                </Text>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["700"],
                                fontWeight: 'normal',
                                }}>
                                {loggedUser}
                                </Text>

                            </Box>

                            <Box
                            tag='li'
                            styleSheet={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '6px'
                            }}>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["400"],
                                fontWeight: 'normal',
                                }}>
                                Seguidores: 
                                </Text>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["700"],
                                fontWeight: 'normal',
                                }}>
                                {userData.followers || '-'}
                                </Text>

                            </Box>

                            <Box
                            tag='li'
                            styleSheet={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '6px'
                            }}>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["400"],
                                fontWeight: 'normal',
                                }}>
                                Local: 
                                </Text>

                                <Text
                                styleSheet={{
                                color: appConfig.theme.colors.neutrals["700"],
                                fontWeight: 'normal',
                                }}>
                                {userData.location || '-'}
                                </Text>

                            </Box>

                            </Box>

                        </Box>

                    </Box>

                </Window>
            </Box>
        </Box>
    )
}
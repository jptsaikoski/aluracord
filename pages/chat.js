import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { Window } from './_app.js';

export default function ChatPage() {
    
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function handleNovaMensagem(novaMensagem) {
        const mensagemData = {
            id: listaDeMensagens.length + 1,
            de: 'vanessametonini',
            texto: novaMensagem,
        };
        setListaDeMensagens([
            mensagemData,
            ...listaDeMensagens,
        ]);
        setMensagem('');
    }

    return (
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(/static/images/background-1280.gif)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', maxHeight: '100vh',
            padding: {
                xs: '24px',
                md: '48px',
            }
          }}>

        <Box 
            styleSheet={{
                height: '100%',
                width: '100%',
                maxWidth: {
                    xs: '100%',
                    md: '800px',
                },
            }}>
            <Window windowTitle='Chat Global'>
            <Box
                styleSheet={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                    height: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    padding: '32px',
                }}>
                    <Header/>
                <Box
                    styleSheet={{
                        overflow: 'hidden',
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals[400],
                        borderRadius: '2px',
                        padding: '16px',
                    }}>
                    
                    <MessageList mensagens={listaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valorMensagem = event.target.value;
                                setMensagem(valorMensagem);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            textFieldColors={{
                                neutral: {
                                    mainColor: appConfig.theme.colors.neutrals[400],
                                    mainColorHighlight: appConfig.theme.colors.neutrals[700],
                                    textColor: appConfig.theme.colors.neutrals[700],
                                  },
                            }}
                            styleSheet={{
                                width: '100%',
                                resize: 'none',
                                padding: '6px 8px',
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals[400],
                                borderRadius: '2px',
                                color: appConfig.theme.colors.neutrals[400],
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                                marginBottom: '-8px'
                            }}/>
                            <Button
                                colorVariant='neutral'
                                label='Enviar'
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
                                    marginLeft: '8px',
                                    paddingTop: '6px',
                                    paddingBottom: '6px',
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["900"],
                                    mainColor: appConfig.theme.colors.neutrals['100'],
                                    mainColorLight: appConfig.theme.colors.neutrals['100'],
                                    mainColorStrong: appConfig.theme.colors.neutrals['200'],
                                  }}
                            />
                    </Box>
                </Box>
            </Box>
            </Window>
        </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', 
            alignItems: 'center', justifyContent: 'space-between' }} >
                <Button
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
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
                        contrastColor: appConfig.theme.colors.neutrals['900'],
                        mainColor: appConfig.theme.colors.neutrals['100'],
                        mainColorLight: appConfig.theme.colors.neutrals['100'],
                        mainColorStrong: appConfig.theme.colors.neutrals['200'],
                      }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box styleSheet={{
            overflow: 'hidden',
            marginBottom: '16px',
            width: '100%',
            height: '100%',
            maxHeight: '100%',
        }}>
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                width: '100%',
                minWidth: 'calc(100% + 17px)',
                height: 'calc(100% + 17px)',
            }}
        >   

            {props.mensagens.map((mensagem) => {
                return (
                <Box 
                tag="li" styleSheet={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0)',
                    hover: {
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals[400],
                    },
                    padding: '6px',
                    
                }}>
                    <Box
                        key={mensagem.id}
                        styleSheet={{
                            borderRadius: '1px',
                            marginBottom: '12px',
                            backgroundColor: appConfig.theme.colors.neutrals[100],
                            color: appConfig.theme.colors.neutrals[700],
                            width: '100%',
                            maxWidth: '100%',
                            overflowX: 'hidden',
                            whiteSpace: 'wrap',
                            wordBreak: 'break-word'
                        }}>
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '1px',
                                    border: '1px solid',
                                    borderColor : appConfig.theme.colors.neutrals[400],
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}/>
                            <Text tag="strong" styleSheet={{color: appConfig.theme.colors.neutrals[700],}}>
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[700],
                                }}
                                tag="span">
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Box>
                    <Box 
                    
                    
                    styleSheet={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '20px', height: '20px', minWidth: '20px',
                        backgroundColor: appConfig.theme.colors.neutrals['100'], 
                        borderRadius: '1px', border: '1px solid', marginLeft: '0px',
                        borderColor: appConfig.theme.colors.neutrals['400'], cursor: 'pointer',
                        boxShadow: 'inset 1px 1px 2px 0px rgba(0,0,0,0.3), inset -1px -1px 2px 0px rgba(255,255,255,0.5)',}}>

                        <Box styleSheet={{
                          minWidth: '26px', height: '1px', transform: 'rotate(45deg)',
                          backgroundColor: appConfig.theme.colors.neutrals['400'],
                          marginTop: '0px', marginBottom: '0px',}}></Box>

                    </Box>
                </Box>    
                );

            })}

        </Box>
        </Box>
    )
}
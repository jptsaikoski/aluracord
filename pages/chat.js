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
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
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
                    md: '95%',
                },
                maxHeight: '95vh',
            }}>
            <Window windowTitle='Chat Global'>
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    backgroundColor: appConfig.theme.colors.neutrals[100],
                    height: '100%',
                    width: '100%',
                    padding: '32px',
                }}>
                <Header/>
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
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
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                padding: '6px 8px',
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals[400],
                                borderRadius: '2px',
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[700],
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                            }}/>
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
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Button
                    variant='secondary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >   

            {props.mensagens.map((mensagem) => {
                return (
                    
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '1px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                
                            },
                            backgroundColor: appConfig.theme.colors.neutrals[100],
                            color: appConfig.theme.colors.neutrals[700],
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong" styleSheet={{color: appConfig.theme.colors.neutrals[700],}}>
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[700],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                    
                );

            })}

        </Box>
    )
}
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { Window } from '../src/components/Window';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { SendSticker } from '../src/components/SendSticker';
import { UserInfo } from '../src/components/UserInfo';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyNDMzNCwiZXhwIjoxOTU4OTAwMzM0fQ.8IZZRsM8OxQaB6h3a8MHNsz2Gl-CbTgbFiOqlEZ-LhQ';
const SUPABASE_URL = 'https://hvcyaxgayljwzrrrxbfv.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function realtimeMessageUpdate(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT',(respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();

}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [isLoaded, setIsLoaded] = React.useState('');
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);


    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then(({data}) => {
                setListaDeMensagens(data);
                setIsLoaded(!isLoaded);
        });

        realtimeMessageUpdate((novaMensagem) => {

            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        

        });
    },[]);

    function handleNovaMensagem(novaMensagem) {
        const mensagemData = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([mensagemData])
            .then(({data}) => {
        });
        
        setMensagem('');
    }

    function deleteMensagem(identificador) {
        supabaseClient
            .from('mensagens')
            .delete()
            .match({id: identificador})
            .then(({data}) => {
                const arrayFinal = listaDeMensagens.filter(function(x) {
                    return x.id != identificador;
                });
                setListaDeMensagens(arrayFinal);
            })
    }

    

    return (
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(/static/images/background-1280.gif)', minHeight: '100%',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', maxHeight: '100vh',
            padding: {
                xs: '24px',
                md: '48px',
            },
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
                    padding: '16px',
                }}>
                    <Header/>
                {!isLoaded 
                ? ( 
                    <Box styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}>
                        <Text styleSheet={{fontSize: '24px', marginBottom: '24px'}}>Recuperando dados...</Text>
                        <div className='loading-bar'>
                            <div className='loading-bar-content'></div>
                        </div>

                        <style jsx>{`
                            @keyframes load {
                                0% {width: 0px}
                                30% {width: 30%}
                                50% {width: 40%}
                                70% {width: 80%}
                                100% {width: 95%}
                              }
                            .loading-bar {
                                width: 200px;
                                height: 24px;
                                border: 1px solid ${appConfig.theme.colors.neutrals[700]};
                            }
                            .loading-bar-content {
                                width: 0px;
                                height: 24px;
                                float: left;
                                background-color: ${appConfig.theme.colors.neutrals[400]};
                                animation: load 4s;
                            }

                        `}</style>
                    </Box>
                ) 
                : (
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
                    
                    <MessageList 
                        mensagens={listaDeMensagens}
                        delete={deleteMensagem} />

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

                            <SendSticker onStickerClick={handleNovaMensagem}/>
                            <Button
                                colorVariant='neutral'
                                label='Enviar'
                                rounded='none'
                                onClick={() => {
                                    handleNovaMensagem(mensagem);
                                }}
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
                )}
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
    const [userInfoState, setUserInfoState] = React.useState(false);

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
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                width: '100%',
                height: '100%',
            }}
        >   

            {props.mensagens.map((mensagem) => {
                const date = mensagem.created_at.substring(0,10);
                return (
                <Box 
                key={mensagem.id}
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
                                <UserInfo isUserInfoOpen={userInfoState} whatUserIs={mensagem.de}/>
                            
                            <Text tag="strong" styleSheet={{color: appConfig.theme.colors.neutrals[700],}}>
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '12px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[400],
                                }}
                                tag="span">
                                {date}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                        ? (
                            <Image src={mensagem.texto.replace(':sticker:', '')}
                                styleSheet={{
                                    maxWidth: {
                                        xs: '100%',
                                        sm: '50%',
                                        md: '300px',
                                        lg: '200px',
                                    },
                                    maxHeight: '200px',
                                }}/>
                        )
                        : (mensagem.texto)
                        }
                    </Box>
                    {/*<Box 
                    onClick={() => {
                        props.delete(mensagem.id);
                    }}
                    
                    styleSheet={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '20px', height: '20px', minWidth: '20px', position: 'relative',
                        backgroundColor: appConfig.theme.colors.neutrals['100'], 
                        borderRadius: '1px', border: '1px solid', marginLeft: '0px',
                        borderColor: appConfig.theme.colors.neutrals['400'], cursor: 'pointer',
                        }}>

                        <Box styleSheet={{
                            position: 'absolute',
                          minWidth: '26px', height: '1px', transform: 'rotate(45deg)',
                          backgroundColor: appConfig.theme.colors.neutrals['400'],
                          marginTop: '0px', marginBottom: '0px',}}></Box>
                        <Box styleSheet={{
                            position: 'absolute',
                          minWidth: '26px', height: '1px', transform: 'rotate(-45deg)',
                          backgroundColor: appConfig.theme.colors.neutrals['400'],
                          marginTop: '0px', marginBottom: '0px',}}></Box>

                        </Box>*/}
                </Box>    
                );

            })}

        </Box>
        </Box>
    )
}
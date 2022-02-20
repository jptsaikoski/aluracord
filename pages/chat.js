import { Box, Text, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { Window } from "../src/components/Window";
import { useRouter } from "next/router";
import { MenuBar } from "../src/components/MenuBar";
import { MessageList } from "../src/components/MessageList";
import { MessageInput } from "../src/components/MessageInput";
import { ChatHeader } from "../src/components/ChatHeader";
import { Background } from "../src/components/Background";
import { supabaseClient } from "../src/components/Supabase";
import Head from "next/head";

function realtimeMessageUpdate(addMessage) {
  return supabaseClient
    .from("global-chat")
    .on("INSERT", (newMessage) => {
      addMessage(newMessage.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const routing = useRouter(),
  loggedUser = routing.query.username,
  [isLoaded, setIsLoaded] = React.useState(''),
  [replyIsOpen, setReplyIsOpen] = React.useState(false),
  [replyMessageID, setReplyMessageID] = React.useState(0),
  [replyMessage, setReplyMessage] = React.useState([
    { id: "", de: "", texto: "", created_at: "" },
  ]),
  [messageTree, setMessageTree] = React.useState([]),
  [backgroundSignal, setBackgroundSignal] = React.useState(''),
  [headTitle, setHeadTitle] = React.useState(''),
  [chatList, setChatList] = React.useState([]),
  [selectedChat, setSelectedChat] = React.useState(1);

  React.useEffect(() => {
    if(!routing.isReady) return;
      if (
        loggedUser != undefined &&
        loggedUser != null &&
        loggedUser != "" &&
        loggedUser != "undefined"
        ) {
        supabaseClient
          .from("chat-list")
          .select("*")
          .then(({ data }) => {
            setChatList(data);
          });

        supabaseClient
          .from("global-chat")
          .select("*")
          .filter('chat_id', 'in', `(${selectedChat})`)
          .range(0, 49)
          .order("id", { ascending: false })
          .then(({ data }) => {


              setMessageTree(data);
              setReplyMessageID(0);
              setReplyMessage([{ id: "", de: "", texto: "", created_at: "", chat_id: ""}]);
              setReplyIsOpen(false);
              setIsLoaded(true);
              setBackgroundSignal(!backgroundSignal);

          });

        realtimeMessageUpdate((newMessage) => {
          setMessageTree((actualTree) => {
            //Notificações -
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
              console.log('Este dispositivo não suporta notificações.');
            } else if (newMessage.de !== loggedUser) {

              const messageNotification = new Notification(newMessage.de + ' - Aluracord', {
                body: newMessage.texto,
                icon: `https://github.com/${newMessage.de}.png`,
              });
              
              setHeadTitle("*" + appConfig.name);

            }
            //Notificações --

            return [newMessage, ...actualTree];

          });
        });

        
        function checkNotificationPermission() {
          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log('Este dispositivo não suporta notificações.');
           } else {
             
             if (Notification.permission !== 'denied') {
               Notification.requestPermission();
             }

           }
           
        }
          
        checkNotificationPermission();
        
        const onFocus = () => {
          if (headTitle !== appConfig.name) {
            setHeadTitle(appConfig.name);
          }
        };

        const windowFocusHandler = () => {
              window.addEventListener("focus", onFocus);
              onFocus();
        }

        windowFocusHandler();

      } else {
        alert("Você precisa estar logado para acessar essa página.");
      routing.push("/");
      }

      return () => {
        window.removeEventListener("focus", onFocus);
    }
  }, [routing.isReady, selectedChat]);

  function addMoreMessages() {
    supabaseClient
          .from("global-chat")
          .select("*")
          .filter('chat_id', 'in', `(${selectedChat})`)
          .range(messageTree.length, messageTree.length + 19)
          .order("id", { ascending: false })
          .then(({ data }) => {
            setMessageTree((actualTree) => {
              return [ ...actualTree, ...data];
            });
            setReplyMessageID(0);
            setReplyMessage([{ id: "", de: "", texto: "", created_at: "", chat_id: ""}]);
            setReplyIsOpen(false);
            //setIsLoaded(!isLoaded);
            setBackgroundSignal(!backgroundSignal);

          });
  }

  function handleNewMessage(newMessage, replyNewMessage) {
    const messageData = {
      de: loggedUser,
      texto: newMessage,
      para: replyNewMessage,
      chat_id: selectedChat,
    };

    if (messageData.texto != "") {
      
      if (messageData.texto.startsWith(':sticker:')) {
        const stickerURL = messageData.texto.replace(":sticker:", "");
        if (appConfig.stickers.indexOf(stickerURL) > -1) {
          supabaseClient
            .from("global-chat")
            .insert([messageData])
            .then(({ data }) => {});
        } else {
          alert('Sticker inválido! Por favor, utilize os Stickers disponibilizados pelo chat.');
        }

      } else {
        supabaseClient
          .from("global-chat")
          .insert([messageData])
          .then(({ data }) => {});
      }
    }

    setReplyMessageID(0);
    setReplyMessage([{ id: "", de: "", texto: "", created_at: "", chat_id: ""}]);
    setReplyIsOpen(false);
    setBackgroundSignal(!backgroundSignal);
  }

  function deleteMessage(identifier, person) {
    if (loggedUser == person) {
      supabaseClient
        .from("global-chat")
        .delete()
        .match({ id: identifier })
        .then(({ data }) => {
          const modifiedMessageTree = messageTree.filter(function (
            deletedMessage
          ) {
            return deletedMessage.id != identifier;
          });
          setMessageTree(modifiedMessageTree);
        });
    } else {
      alert("Você não pode apagar mensagens de outro usuário >:(");
    }
    setBackgroundSignal(!backgroundSignal);
  }

  function changeBackground() {
    const randomNumber = Math.floor(Math.random() * 3);

    if (gifUrl.endsWith(".gif")) {
      setGifUrl(`/static/images/frame-${randomNumber}.png`);
    } else {
      setGifUrl("/static/images/background-1280-30.gif");

      const gifTimer = setTimeout(function () {
        setGifUrl(`/static/images/frame-${randomNumber}.png`);
      }, 2000);
    }
  }

  function selectReply(messageID) {
    setReplyMessageID(messageID);
    setReplyMessage(messageTree.filter(checkID));
    setReplyIsOpen(true);

    function checkID(rightMessage) {
      return rightMessage.id === messageID;
    }
  }

  function changeChat(server) {
    setSelectedChat(server);
  }

  return (
    <>
      <Head>
        <title>{headTitle || appConfig.name}</title>
      </Head>
      <Background changeSignal={backgroundSignal}>
      <MenuBar loggedUser={loggedUser} />

      <Box
        styleSheet={{
          height: "100%",
          maxHeight: {
            xs: "calc(100% - 72px - 16px)",
            lg: "100%",
          },
          width: "100%",
          maxWidth: {
            xs: "100%",
            md: "800px",
          },
        }}
      >
        <Window
          windowTitle="Chat Global"
          closeButton={() => {
            routing.push(`/`);
          }}
        >

          <Box
            styleSheet={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              backgroundColor: appConfig.theme.colors.neutrals[100],
              height: "100%",
              maxHeight: "100%",
              width: "100%",
              padding: "16px",
            }}
          >
            <ChatHeader chatList={chatList} chatSelected={changeChat} />
            {!isLoaded ? (
              <Box
                styleSheet={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Text styleSheet={{ fontSize: "24px", marginBottom: "24px" }}>
                  Recuperando dados...
                </Text>
                <div className="loading-bar">
                  <div className="loading-bar-content"></div>
                </div>

                <style jsx>{`
                  @keyframes load {
                    0% {
                      width: 0px;
                    }
                    30% {
                      width: 30%;
                    }
                    50% {
                      width: 40%;
                    }
                    70% {
                      width: 80%;
                    }
                    100% {
                      width: 95%;
                    }
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
                    animation: load 5s;
                  }
                `}</style>
              </Box>
            ) : (
              <Box
                styleSheet={{
                  overflow: "hidden",
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  border: "1px solid",
                  borderColor: appConfig.theme.colors.neutrals[400],
                  borderRadius: "2px",
                  padding: "16px",
                }}
              >
                <MessageList
                  messageList={messageTree}
                  delete={deleteMessage}
                  loggedUser={loggedUser}
                  replySelector={selectReply}
                  loadMessages={addMoreMessages}
                />

                {replyIsOpen && (
                  <Box
                    styleSheet={{
                      overflow: "hidden",
                      width: "100%",
                      minHeight: "48px",
                      maxHeight: "72px",
                      backgroundColor: appConfig.theme.colors.neutrals[200],
                      marginBottom: "8px",
                      border: "1px solid",
                      borderColor: appConfig.theme.colors.neutrals[400],
                      borderRadius: "2px",
                      display: "block",
                    }}
                  >
                    <Box
                      key={replyMessage[0].id}
                      tag="li"
                      styleSheet={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                        minHeight: "48px",
                        padding: "6px",
                      }}
                    >
                      <Box
                        styleSheet={{
                          borderRadius: "1px",
                          backgroundColor: "",
                          color: appConfig.theme.colors.neutrals[700],
                          width: "100%",
                          maxWidth: "100%",
                          minHeight: "48px",
                          overflowX: "hidden",
                          whiteSpace: "wrap",
                          wordBreak: "break-word",
                          fontSize: "14px",
                        }}
                      >
                        <Box
                          styleSheet={{
                            marginBottom: "4px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            styleSheet={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "1px",
                              border: "1px solid",
                              borderColor: appConfig.theme.colors.neutrals[400],
                              display: "inline-block",
                              marginRight: "8px",
                              cursor: "pointer",
                            }}
                            src={`https://github.com/${replyMessage[0].de}.png`}
                          />

                          <Text
                            tag="strong"
                            styleSheet={{
                              color: appConfig.theme.colors.neutrals[700],
                              fontSize: "14px",
                            }}
                          >
                            {replyMessage[0].de}
                          </Text>
                          <Text
                            styleSheet={{
                              fontSize: "12px",
                              marginLeft: "8px",
                              color: appConfig.theme.colors.neutrals[400],
                              fontSize: "12px",
                            }}
                            tag="span"
                          >
                            {replyMessage[0].created_at.substring(0, 10)}
                          </Text>
                        </Box>
                        {replyMessage[0].texto.startsWith(":sticker:") ? (
                          <Image
                            src={replyMessage[0].texto.replace(":sticker:", "")}
                            styleSheet={{
                              maxWidth: "24px",
                              maxHeight: "24px",
                            }}
                          />
                        ) : (
                          replyMessage[0].texto
                        )}
                      </Box>
                      <Box
                        onClick={() => {
                          setReplyMessageID(0);
                          setReplyMessage([
                            { id: "", de: "", texto: "", created_at: "" },
                          ]);
                          setReplyIsOpen(false);
                        }}
                        styleSheet={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "20px",
                          height: "20px",
                          minWidth: "20px",
                          position: "relative",
                          backgroundColor: "",
                          borderRadius: "1px",
                          border: "1px solid",
                          marginLeft: "0px",
                          borderColor: appConfig.theme.colors.neutrals["400"],
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          styleSheet={{
                            position: "absolute",
                            minWidth: "26px",
                            height: "1px",
                            transform: "rotate(45deg)",
                            backgroundColor:
                              appConfig.theme.colors.neutrals["400"],
                            marginTop: "0px",
                            marginBottom: "0px",
                          }}
                        ></Box>
                        <Box
                          styleSheet={{
                            position: "absolute",
                            minWidth: "26px",
                            height: "1px",
                            transform: "rotate(-45deg)",
                            backgroundColor:
                              appConfig.theme.colors.neutrals["400"],
                            marginTop: "0px",
                            marginBottom: "0px",
                          }}
                        ></Box>
                      </Box>
                    </Box>
                  </Box>
                )}

                <Box
                  as="form"
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  
                  <MessageInput sendMessage={handleNewMessage} sendSticker={handleNewMessage} getReplyID={replyMessageID} />

                </Box>
              </Box>
            )}
          </Box>
        </Window>
      </Box>
    </Background>
    </>
  );
}

import { Box, Text, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { Window } from "../src/components/Window";
import { useRouter } from "next/router";
import { MenuBar } from "../src/components/MenuBar";
import { MessageList } from "../src/components/MessageList";
import { MessageInput } from "../src/components/MessageInput";
import { supabaseClient } from "../src/components/Supabase";

function realtimeMessageUpdate(addMessage) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (newMessage) => {
      addMessage(newMessage.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const routing = useRouter();
  const loggedUser = routing.query.username;
  const [counter, setCounter] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState('');
  const [replyIsOpen, setReplyIsOpen] = React.useState(false);
  const [replyMessageID, setReplyMessageID] = React.useState(0);
  const [replyMessage, setReplyMessage] = React.useState([
    { id: "", de: "", texto: "", created_at: "" },
  ]);
  const [messageTree, setMessageTree] = React.useState([]);
  const [gifUrl, setGifUrl] = React.useState("/static/images/frame-1.png");

  React.useEffect(() => {
    if (counter < 10) {
      if (
        loggedUser != undefined &&
        loggedUser != null &&
        loggedUser != "" &&
        loggedUser != "undefined"
      ) {
        supabaseClient
          .from("mensagens")
          .select("*")
          .range(0, 19)
          .order("id", { ascending: false })
          .then(({ data }) => {
            if (
              loggedUser != undefined &&
              loggedUser != null &&
              loggedUser != ""
            ) {


              setMessageTree(data);
              setIsLoaded(!isLoaded);
              changeBackground();

            } else {
              alert("Você precisa estar logado para acessar o chat");
              routing.push("/");
            }
          });

        realtimeMessageUpdate((newMessage) => {
          setMessageTree((actualTree) => {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
              console.log('Este dispositivo não suporta notificações.');
            } else if (newMessage.de !== loggedUser) {
              const messageNotification = new Notification(newMessage.de + ' - Aluracord', {
                body: newMessage.texto,
                icon: `https://github.com/${newMessage.de}.png`,
              });
            }
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

      } else {
        setCounter(counter + 1);
      }
    } else {
      alert("Você precisa estar logado para acessar essa página.");
      routing.push("/");
    }
  }, [counter]);

  function handleNewMessage(newMessage, replyNewMessage) {
    const messageData = {
      de: loggedUser,
      texto: newMessage,
      para: replyNewMessage,
    };

    if (messageData.texto != "") {
      supabaseClient
        .from("mensagens")
        .insert([messageData])
        .then(({ data }) => {});
    }

    setReplyMessageID(0);
    setReplyMessage([{ id: "", de: "", texto: "", created_at: "" }]);
    setReplyIsOpen(false);
    changeBackground();
  }

  function deleteMessage(identifier, person) {
    if (loggedUser == person) {
      supabaseClient
        .from("mensagens")
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
    changeBackground();
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

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: { xs: "center", lg: "flex-start" },
        justifyContent: "flex-end",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        backgroundColor: "#091B15",
        backgroundImage: `url(${gifUrl})`,
        minHeight: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxHeight: { xs: "calc(100vh + 72px + 16px)", lg: "100vh" },
        transition: "all 0.05s",
        padding: {
          xs: "24px",
          md: "48px",
        },
      }}
    >
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
            <Header />
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
                    animation: load 4s;
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
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          colorVariant="neutral"
          label="Sair"
          href="/"
          rounded="none"
          styleSheet={{
            backgroundColor: appConfig.theme.colors.neutrals["100"],
            borderRadius: "2px",
            border: "1px solid",
            borderTopColor: appConfig.theme.colors.neutrals["400"],
            borderLeftColor: appConfig.theme.colors.neutrals["400"],
            borderRightColor: appConfig.theme.colors.neutrals["400"],
            borderBottomColor: appConfig.theme.colors.neutrals["400"],
            boxShadow:
              "inset 2px 3px 1px 0px rgba(255,255,255,1), inset -2px -3px 1px 0px rgba(0,0,0,0.16)",
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["900"],
            mainColor: appConfig.theme.colors.neutrals["100"],
            mainColorLight: appConfig.theme.colors.neutrals["100"],
            mainColorStrong: appConfig.theme.colors.neutrals["200"],
          }}
        />
      </Box>
    </>
  );
}

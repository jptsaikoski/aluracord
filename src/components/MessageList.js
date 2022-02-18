import { Box, Text, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../../config.json";
import { DeleteMessage } from "./DeleteMessage";
import { UserInfo } from "./UserInfo";

export function MessageList(props) {
  const [userInfoState, setUserInfoState] = React.useState(false),
  [isMessagesLoaded, setIsMessagesLoaded] = React.useState("none");

  React.useEffect(() => {
    if (props.messageList.length === 0) return;
    setIsMessagesLoaded("flex");
  },[props.messageList])

  return (
    <Box
      styleSheet={{
        overflow: "hidden",
        marginBottom: "16px",
        width: "100%",
        height: "100%",
        maxHeight: "100%",
      }}
    >
      <Box
        tag="ul"
        styleSheet={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          flex: 1,
          color: appConfig.theme.colors.neutrals["700"],
          width: "100%",
          height: "100%",
        }}
      >
        {props.messageList
          ? props.messageList.map((message) => {
              const dateUTC = new Date(message.created_at);
              const date = dateUTC.toLocaleString();
              function deleteMessageSignal() {
                props.delete(message.id, message.de);
              }
              function selectReply() {
                const replyMessage = props.messageList.filter(checkID);
                const replyMessageEmpty = [
                  { id: "", created_at: "", de: "", texto: "", para: "" },
                ];

                function checkID(rightMessage) {
                  return rightMessage.id === message.para;
                }
                if (replyMessage[0] != undefined && replyMessage[0] != 0) {
                  return replyMessage;
                } else {
                  return replyMessageEmpty;
                }
              }
              const replyMessageFinal = selectReply();
              const replyDateUTC = new Date(replyMessageFinal[0].created_at);
              const replyDate =
                replyDateUTC != "Invalid Date"
                  ? replyDateUTC.toLocaleString()
                  : "";
              return (
                <li
                  key={message.id}
                  id={'message-' + message.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                    border: "1px solid",
                    borderColor: "rgba(0,0,0,0)",
                    hover: {
                      border: "1px solid",
                      borderColor: appConfig.theme.colors.neutrals[400],
                    },
                    padding: "6px",
                  }}
                >
                  {message.para != "" &&
                  message.para != undefined &&
                  message.para != null &&
                  message.para != 0 ? (
                    <a
                      href={'#message-' + replyMessageFinal[0].id}
                      style={{
                        display: "block",
                        overflow: "hidden",
                        width: "100%",
                        minHeight: "36px",
                        maxHeight: "72px",
                        backgroundColor: appConfig.theme.colors.neutrals[200],
                        marginBottom: "8px",
                        border: "1px solid",
                        borderLeft: "3px solid",
                        borderColor: appConfig.theme.colors.neutrals[400],
                        borderLeftColor: appConfig.theme.colors.neutrals[400],
                        borderRadius: "2px",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        key={replyMessageFinal[0].id}
                        tag=""
                        styleSheet={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          width: "100%",
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
                            {replyMessageFinal[0].de != "" &&
                            replyMessageFinal[0].de != undefined &&
                            replyMessageFinal[0].de != null ? (
                              <Image
                                styleSheet={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "1px",
                                  border: "1px solid",
                                  borderColor:
                                    appConfig.theme.colors.neutrals[400],
                                  display: "inline-block",
                                  marginRight: "8px",
                                  cursor: "pointer",
                                }}
                                src={`https://github.com/${replyMessageFinal[0].de}.png`}
                              />
                            ) : (
                              ""
                            )}

                            <Text
                              tag="strong"
                              styleSheet={{
                                color: appConfig.theme.colors.neutrals[700],
                                fontSize: "14px",
                              }}
                            >
                              {replyMessageFinal[0].de}
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
                              {replyDate}
                            </Text>
                          </Box>
                          {replyMessageFinal[0].texto.startsWith(
                            ":sticker:"
                          ) ? (
                            <Image
                              src={replyMessageFinal[0].texto.replace(
                                ":sticker:",
                                ""
                              )}
                              styleSheet={{
                                maxWidth: "24px",
                                maxHeight: "24px",
                              }}
                            />
                          ) : (
                            replyMessageFinal[0].texto ||
                            "Essa mensagem foi apagada."
                          )}
                        </Box>
                      </Box>
                    </a>
                  ) : (
                    ""
                  )}

                  <Box
                    styleSheet={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Box
                      styleSheet={{
                        borderRadius: "1px",
                        marginBottom: "12px",
                        backgroundColor: "",
                        color: appConfig.theme.colors.neutrals[700],
                        width: "100%",
                        maxWidth: "100%",
                        overflowX: "hidden",
                        whiteSpace: "wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      <Box
                        styleSheet={{
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <UserInfo
                          isUserInfoOpen={userInfoState}
                          whatUserIs={message.de}
                        />

                        <Text
                          tag="strong"
                          styleSheet={{
                            color:
                              props.loggedUser == message.de
                                ? appConfig.theme.colors.primary["500"]
                                : appConfig.theme.colors.neutrals[700],
                          }}
                        >
                          {message.de}
                        </Text>
                        <Text
                          styleSheet={{
                            fontSize: "12px",
                            marginLeft: "8px",
                            color: appConfig.theme.colors.neutrals[400],
                          }}
                          tag="span"
                        >
                          {date}
                        </Text>
                      </Box>
                      {message.texto.startsWith(":sticker:") ? (
                        <Image
                          src={message.texto.replace(":sticker:", "")}
                          styleSheet={{
                            maxWidth: {
                              xs: "100%",
                              sm: "50%",
                              md: "300px",
                              lg: "200px",
                            },
                            maxHeight: "200px",
                          }}
                        />
                      ) : (
                        message.texto
                      )}
                    </Box>
                    <Box
                      onClick={() => {
                        props.replySelector(message.id);
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
                        backgroundImage:
                          "url(/static/images/reply-icon-32.png)",
                        backgroundSize: "16px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        marginRight: "8px",
                      }}
                    ></Box>
                    {props.loggedUser == message.de && (
                      <DeleteMessage deleteSignal={deleteMessageSignal} />
                    )}
                  </Box>
                </li>
              );
            })
          : "Algo deu errado..."}
        
        <Button
          colorVariant="neutral"
          label="Carregar mais"
          rounded="none"
          onClick={() => {
            props.loadMessages();
          }}
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
            minHeight: "30px",
            maxWidth: "128px",
            margin: "16px",
            display: isMessagesLoaded
          }}
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["900"],
            mainColor: appConfig.theme.colors.neutrals["100"],
            mainColorLight: appConfig.theme.colors.neutrals["100"],
            mainColorStrong: appConfig.theme.colors.neutrals["200"],
          }}
        />
      </Box>
    </Box>
  );
}

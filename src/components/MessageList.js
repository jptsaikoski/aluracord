import { Box, Text, Image } from "@skynexui/components";
import React from "react";
import appConfig from "../../config.json";
import { DeleteMessage } from "./DeleteMessage";
import { UserInfo } from "./UserInfo";

export function MessageList(props) {
  const [userInfoState, setUserInfoState] = React.useState(false);

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
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          width: "100%",
          height: "100%",
        }}
      >
        {props.messageList.map((message) => {
          const date = message.created_at.substring(0, 10);
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
          return (
            <Box
              key={message.id}
              tag="li"
              styleSheet={{
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
                <Box
                  styleSheet={{
                    overflow: "hidden",
                    width: "100%",
                    minHeight: "48px",
                    maxHeight: "72px",
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                    marginBottom: "8px",
                    border: "1px solid",
                    borderLeft: "3px solid",
                    borderColor: appConfig.theme.colors.neutrals[400],
                    borderLeftColor: appConfig.theme.colors.neutrals[400],
                    borderRadius: "2px",
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
                          src={`https://github.com/${replyMessageFinal[0].de}.png`}
                        />

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
                          {replyMessageFinal[0].created_at.substring(0, 10)}
                        </Text>
                      </Box>
                      {replyMessageFinal[0].texto.startsWith(":sticker:") ? (
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
                        replyMessageFinal[0].texto
                      )}
                    </Box>
                  </Box>
                </Box>
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
                    backgroundImage: "url(/static/images/reply-icon-32.png)",
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
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

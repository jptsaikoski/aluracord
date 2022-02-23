import { Box, Button, Text, Image } from "@skynexui/components";
import React from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";
import { Window } from "../src/components/Window";
import { Background } from "../src/components/Background";
import { LoginBox } from "../src/components/LoginBox";

export default function PaginaInicial() {
  const routing = useRouter(),
  [backgroundSignal, setBackgroundSignal] = React.useState('');

  React.useEffect(() => {
    setBackgroundSignal(!backgroundSignal);
  }, []);

  function backgroundChange() {
    setBackgroundSignal(!backgroundSignal);
  }


  return (
    <>
      <Background changeSignal={backgroundSignal}>

        <Box
          styleSheet={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            styleSheet={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: {
                xs: "center",
                lg: "flex-end"
              },
              paddingRight: "16px"
            }}
          >
            <Box
              styleSheet={{
                width: "100%",
                maxWidth: "600px",
                alignSelf: {
                  xs: "flex-start",
                  lg: "center"
                }
              }}
            >
              <Window windowTitle={"Sobre"}>
                <Box
                  styleSheet={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "32px",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: appConfig.theme.colors.neutrals["100"],
                  }}
                >
                  <Text
                  tag="p"
                  styleSheet={{
                    fontSize: "18px",
                    fontWeight: "300",
                    color: appConfig.theme.colors.neutrals[600],
                    textIndent: "20px",
                    marginBottom: "20px"
                  }}
                  >
                    Olá, seja bem-vindo! Esse é o "Aluracord - Matrix", um chat aberto para pessoas que gostam de 
                    tecnologia e nerdices conversarem sobre assuntos em comum. Sinta-se a vontade, converse, faça amigos e divida ideias.
                  </Text>
                  <Text
                  tag="p"
                  styleSheet={{
                    fontSize: "18px",
                    fontWeight: "300",
                    color: appConfig.theme.colors.neutrals[600],
                    textIndent: "20px",
                    marginBottom: "20px"
                  }}
                  >
                    Não há necessidade de criar uma nova conta aqui, apenas pedimos que use o seu username do GitHub.
                  </Text>
                  <Box
                    styleSheet={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "flex-start"
                    }}
                  >
                    <Image
                      styleSheet={{
                        maxWidth: "50%",
                        maxHeight: "200px",
                        paddingRight: "6px"
                      }}
                      src="/static/stickers/31.gif"
                    />
                    <Image
                      styleSheet={{
                        maxWidth: "50%",
                        maxHeight: "200px",
                        paddingLeft: "6px"
                      }}
                      src="/static/stickers/32.gif"
                    />
                  </Box>
                  <Button
                    colorVariant="neutral"
                    label="Entrar no chat"
                    rounded="none"
                    onClick={() => {
                      routing.push(`/login`);
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
                      marginTop: "32px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      display: {
                        xs: "flex",
                        lg: "none"
                      },

                    }}
                    buttonColors={{
                      contrastColor: appConfig.theme.colors.neutrals["900"],
                      mainColor: appConfig.theme.colors.neutrals["100"],
                      mainColorLight: appConfig.theme.colors.neutrals["100"],
                      mainColorStrong: appConfig.theme.colors.neutrals["200"],
                    }}
                  />
                </Box>
              </Window>
            </Box>
          </Box>

          <Box
            styleSheet={{
              width: "100%",
              height: "100%",
              display: {
                xs: "none",
                lg: "flex"
              },
              justifyContent: "flex-start",
              paddingLeft: "16px",
            }}
          >
            <Box
              styleSheet={{
                width: "100%",
                maxWidth: "600px",
                alignSelf: "flex-end"
              }}
            >
              <LoginBox backgroundChange={backgroundChange}/>
            </Box>
          </Box>

        </Box>

      </Background>
    </>
  );
}

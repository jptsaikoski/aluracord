import { Box, Text, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { Window } from "../src/components/Window";
import { useRouter } from "next/router";
import { MenuBar } from "../src/components/MenuBar";
import { Background } from "../src/components/Background";

export default function AboutPage() {
  const routing = useRouter(),
  loggedUser = routing.query.username,
  [counter, setCounter] = React.useState(0),
  [isLoaded, setIsLoaded] = React.useState(true),
  [backgroundSignal, setBackgroundSignal] = React.useState('');

  React.useEffect(() => {
    if(!routing.isReady) return;
    if (
      loggedUser != undefined &&
      loggedUser != null &&
      loggedUser != "" &&
      loggedUser != "undefined"
    ) {
      //setIsLoaded(!isLoaded);
      setBackgroundSignal(!backgroundSignal);
    } else {
      alert("Você precisa estar logado para acessar essa página.");
      routing.push("/");
    }
  }, [routing.isReady]);


  return (
    <Background changeSignal={backgroundSignal}>
      <MenuBar loggedUser={loggedUser} />

      <Box
        styleSheet={{
          height: "100%",
          maxHeight: {
            xs: "calc(100% - 24px)",
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
          windowTitle="Sobre o projeto"
          styleRules={{}}
          closeButton={() => {
            routing.push(`/`);
          }}
        >
          <Box
            styleSheet={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: appConfig.theme.colors.neutrals[100],
              height: "100%",
              maxHeight: "100%",
              width: "100%",
              padding: {
                xs: "16px",
                lg: "32px",
              },
            }}
          >
            <Box
              styleSheet={{
                width: "100%",
                maxHeight: "100%",
                display: "flex",
                flexWrap: {
                  xs: "wrap",
                  lg: "nowrap",
                },
                flexDirection: {
                  xs: "row-reverse",
                  lg: "row",
                },
              }}
            >
              <Box
                styleSheet={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: {
                    xs: "100%",
                    lg: "30%",
                  },
                  maxHeight: "100%",
                  padding: "16px",
                }}
              >
                <Image
                  styleSheet={{
                    maxWidth: "150px",
                    borderRadius: "2px",
                    marginBottom: "16px",
                    border: "1px solid",
                    borderColor: appConfig.theme.colors.neutrals["400"],
                  }}
                  src={`https://github.com/jptsaikoski.png`}
                />

                <Text
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals["700"],
                    fontWeight: "normal",
                    marginBottom: "16px",
                  }}
                >
                  Oi! Se quiser, me siga nas minhas redes sociais abaixo. Você
                  pode deixar comentários e sugestões no repositório desse
                  projeto no Github. Ou também me mandar uma mensagem legal :)
                </Text>

                <Box
                  styleSheet={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    colorVariant="neutral"
                    href="https://github.com/jptsaikoski"
                    styleSheet={{
                      backgroundColor: appConfig.theme.colors.neutrals["100"],
                      marginRight: "8px",
                      marginLeft: "8px",
                      borderRadius: "2px",
                      border: "1px solid",
                      borderTopColor: appConfig.theme.colors.neutrals["400"],
                      borderLeftColor: appConfig.theme.colors.neutrals["400"],
                      borderRightColor: appConfig.theme.colors.neutrals["400"],
                      borderBottomColor: appConfig.theme.colors.neutrals["400"],
                      boxShadow:
                        "inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)",
                      width: "32px",
                      height: "32px",
                      backgroundImage: "url(/static/images/github-icon.png)",
                      backgroundSize: "20px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      transition: "all 0.1s",
                      cursor: "pointer",
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals["200"],
                      },
                    }}
                  ></Button>

                  <Button
                    colorVariant="neutral"
                    href="https://instagram.com/_jpts_"
                    styleSheet={{
                      backgroundColor: appConfig.theme.colors.neutrals["100"],
                      marginRight: "8px",
                      marginLeft: "8px",
                      borderRadius: "2px",
                      border: "1px solid",
                      borderTopColor: appConfig.theme.colors.neutrals["400"],
                      borderLeftColor: appConfig.theme.colors.neutrals["400"],
                      borderRightColor: appConfig.theme.colors.neutrals["400"],
                      borderBottomColor: appConfig.theme.colors.neutrals["400"],
                      boxShadow:
                        "inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)",
                      width: "32px",
                      height: "32px",
                      backgroundImage: "url(/static/images/instagram-icon.png)",
                      backgroundSize: "20px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      transition: "all 0.1s",
                      cursor: "pointer",
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals["200"],
                      },
                    }}
                  ></Button>

                  <Button
                    colorVariant="neutral"
                    href="https://www.linkedin.com/in/pedro-saikoski"
                    styleSheet={{
                      backgroundColor: appConfig.theme.colors.neutrals["100"],
                      marginRight: "8px",
                      marginLeft: "8px",
                      borderRadius: "2px",
                      border: "1px solid",
                      borderTopColor: appConfig.theme.colors.neutrals["400"],
                      borderLeftColor: appConfig.theme.colors.neutrals["400"],
                      borderRightColor: appConfig.theme.colors.neutrals["400"],
                      borderBottomColor: appConfig.theme.colors.neutrals["400"],
                      boxShadow:
                        "inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)",
                      width: "32px",
                      height: "32px",
                      backgroundImage: "url(/static/images/linkedin-icon.png)",
                      backgroundSize: "20px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      transition: "all 0.1s",
                      cursor: "pointer",
                      hover: {
                        backgroundColor: appConfig.theme.colors.neutrals["200"],
                      },
                    }}
                  ></Button>
                </Box>
              </Box>

              <Box
                tag="ul"
                styleSheet={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  minHeight: "100%",
                  padding: "16px",
                }}
              >
                <Box
                  tag="li"
                  styleSheet={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "6px",
                  }}
                >
                  <Text
                    tag="h2"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals["400"],
                      fontWeight: "normal",
                    }}
                  >
                    Nome do criador:
                  </Text>

                  <Text
                    tag="h3"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals["700"],
                      fontWeight: "normal",
                    }}
                  >
                    Pedro Saikoski
                  </Text>
                </Box>

                <Box
                  tag="li"
                  styleSheet={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "6px",
                  }}
                >
                  <Text
                    tag="h2"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals["400"],
                      fontWeight: "normal",
                    }}
                  >
                    Data de criação:
                  </Text>

                  <Text
                    tag="h3"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals["700"],
                      fontWeight: "normal",
                    }}
                  >
                    24 de Janeiro de 2022
                  </Text>
                </Box>

                <Box
                  tag="li"
                  styleSheet={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "6px",
                  }}
                >
                  <Text
                    tag="h2"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals["400"],
                      fontWeight: "normal",
                    }}
                  >
                    Descrição:
                  </Text>

                  <Text
                    tag="p"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals["700"],
                      fontWeight: "normal",
                    }}
                  >
                    Esse projeto foi o meu primeiro contato real com ReactJS,
                    criado durante a "Imersão React", evento produzido pela
                    grandiosa Alura Cursos Online. Junto aos
                    mentores/professores Mario Souto e Paulo Silveira, eu e mais
                    2 mil pessoas colocamos em prática, no período de uma
                    semana, o projeto simples de um chat aberto, utilizando
                    tecnologias como o React, Next JS e Supabase. O início DESSE
                    projeto foi com intenção de criar algo que remetesse ao
                    antigo Mac OS 7.5, misturado com uma temática Matrix.
                    Inicialmente o chat era apenas global e sem muitos recursos.
                    Hoje, busco implementar diversas features mais modernas e
                    transformar em um projeto real e útil para a comunidade.
                    Aqui você poderá ser quem você quiser e conversar com quem
                    quiser, fazer amigos, encontrar parceiros, dar umas risadas
                    e dividir experiências. Obrigado a todos que apoiam o
                    projeto e que estiverem lendo isso!
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Window>
      </Box>
    </Background>
  );
}

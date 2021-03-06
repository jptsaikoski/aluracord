import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import { supabaseClient } from "../src/components/Supabase";
import appConfig from "../config.json";
import { Window } from "../src/components/Window";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { MenuBar } from "../src/components/MenuBar";
import { Background } from "../src/components/Background";

export default function ProfilePage() {
  const routing = useRouter(),
  loggedUser = routing.query.username,
  [isLoaded, setIsLoaded] = React.useState(""),
  [userData, setUserData] = React.useState({
    name: "",
    followers: 0,
    location: "",
    bio: "",
  }),
  [backgroundSignal, setBackgroundSignal] = React.useState('');;

  React.useEffect(() => {
    if(!routing.isReady) return;
    if (
      loggedUser != undefined &&
      loggedUser != null &&
      loggedUser != "" &&
      loggedUser != "undefined"
    ) {
      fetch(`https://api.github.com/users/${loggedUser}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        });

      setIsLoaded(!isLoaded);
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
          windowTitle="Seu Perfil"
          styleRules={{}}
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
              padding: {
                xs: "16px",
                lg: "32px",
              },
            }}
          >
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
                  overflow: "auto",
                  width: "100%",
                  maxHeight: "100%",
                  display: "flex",
                  flexDirection: {
                    xs: "column",
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
                      lg: "50%",
                    },
                    maxHeight: "100%",
                    padding: "16px",
                  }}
                >
                  <Image
                    styleSheet={{
                      width: "200px",
                      borderRadius: "2px",
                      marginBottom: "16px",
                      border: "1px solid",
                      borderColor: appConfig.theme.colors.neutrals["400"],
                    }}
                    src={`https://github.com/${loggedUser}.png`}
                  />
                </Box>

                <Box
                  tag="ul"
                  styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
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
                      Nome:
                    </Text>

                    <Text
                      tag="h3"
                      styleSheet={{
                        wordBreak: "break-all",
                        color: appConfig.theme.colors.neutrals["700"],
                        fontWeight: "normal",
                      }}
                    >
                      {userData.name || "-"}
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
                      Bio:
                    </Text>

                    <Text
                      tag="h3"
                      styleSheet={{
                        wordBreak: "break-all",
                        color: appConfig.theme.colors.neutrals["700"],
                        fontWeight: "normal",
                      }}
                    >
                      {userData.bio || "-"}
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
                      Username:
                    </Text>

                    <Text
                      tag="h3"
                      styleSheet={{
                        wordBreak: "break-all",
                        color: appConfig.theme.colors.neutrals["700"],
                        fontWeight: "normal",
                      }}
                    >
                      {loggedUser}
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
                      Seguidores:
                    </Text>

                    <Text
                      tag="h3"
                      styleSheet={{
                        wordBreak: "break-all",
                        color: appConfig.theme.colors.neutrals["700"],
                        fontWeight: "normal",
                      }}
                    >
                      {userData.followers || "-"}
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
                      Local:
                    </Text>

                    <Text
                      tag="h3"
                      styleSheet={{
                        wordBreak: "break-all",
                        color: appConfig.theme.colors.neutrals["700"],
                        fontWeight: "normal",
                      }}
                    >
                      {userData.location || "-"}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Window>
      </Box>
    </Background>
  );
}

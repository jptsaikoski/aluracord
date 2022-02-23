import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import { useRouter } from "next/router";
import appConfig from "../../config.json";
import { Window } from "./Window";

export function LoginBox(props) {
  const routing = useRouter(),
  [username, setUsername] = React.useState(""),
  [usernameValid, setUsernameValid] = React.useState(""),
  [test, setTest] = React.useState([]),
  [userData, setUserData] = React.useState({
    name: "",
    followers: 0,
    location: "",
  }),
  [isRealUser, setIsRealUser] = React.useState(true);

  function getUserData(valor) {
    test.forEach(function (timer) {
      clearTimeout(timer);
    });

    setTest([
      setTimeout(function () {
        fetch(`https://api.github.com/users/${valor}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUserData(data);
            if (data.login === valor) {
              setIsRealUser(false);
            } else {
              setIsRealUser(true);
            }
          });
          props.backgroundChange();
      }, 1000),
      ...test,
    ]);
  }

  function changeName(param) {
    if (param.length > 2) {
      setUsernameValid(param);
    } else {
      setUsernameValid("");
    }
  }

  return (
    <>
        <Window windowTitle={appConfig.name}>
            {/* Conteúdo - INICIO */}
            <Box
              styleSheet={{
                padding: "32px",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                backgroundColor: appConfig.theme.colors.neutrals["100"],
                width: "100%",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
              }}
            >
              {/* Formulário */}
              <Box
                as="form"
                onSubmit={function (event) {
                  event.preventDefault();
                  if (isRealUser === false) {
                    routing.push(`/chat?username=${username}`);
                  }
                }}
                styleSheet={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "100%", sm: "50%" },
                  textAlign: "center",
                  marginBottom: "32px",
                  marginRight: {
                    xs: "0px",
                    lg: "16px"
                  }
                }}
              >
                <Text 
                  tag="h2"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals["900"],
                    fontSize: "24px",
                    fontWeight: "normal",
                    marginBottom: "23px",
                  }}
                >
                  Bem vindo de volta!
                </Text>

                <TextField
                  fullWidth
                  placeholder="Insira seu usuário do Github..."
                  rounded="none"
                  value={username}
                  onChange={function (event) {
                    const valor = event.target.value;
                    setUsername(valor);
                    changeName(valor);
                    getUserData(valor);
                    setIsRealUser(true);
                  }}
                  styleSheet={{
                    borderRadius: "2px",
                    boxShadow: "inset 2px 3px 1px 0px rgba(0,0,0,0.16)",
                  }}
                  textFieldColors={{
                    neutral: {
                      textColor: appConfig.theme.colors.neutrals[900],
                      mainColor: appConfig.theme.colors.neutrals[400],
                      mainColorHighlight:
                        appConfig.theme.colors.neutrals["900"],
                      backgroundColor: appConfig.theme.colors.neutrals[200],
                    },
                  }}
                />
                <Button
                  disabled={isRealUser}
                  type="submit"
                  label="Entrar"
                  fullWidth
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
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["900"],
                    mainColor: appConfig.theme.colors.neutrals["100"],
                    mainColorLight: appConfig.theme.colors.neutrals["100"],
                    mainColorStrong: appConfig.theme.colors.neutrals["200"],
                  }}
                />
              </Box>
              {/* Formulário */}

              {/* Photo Area */}
              <Box
                styleSheet={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "200px",
                  padding: "32px",
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                  border: "1px solid",
                  borderColor: appConfig.theme.colors.neutrals[400],
                  borderRadius: "2px",
                  flex: 1,
                  minHeight: "240px",
                }}
              >
                <Image
                  styleSheet={{
                    borderRadius: "2px",
                    marginBottom: "16px",
                    border: "1px solid",
                    borderColor: appConfig.theme.colors.neutrals["400"],
                  }}
                  src={
                    usernameValid != ""
                      ? `https://github.com/${usernameValid}.png`
                      : "/static/images/mac-os-avatar.png"
                  }
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.primary[500],
                    backgroundColor: "",
                    padding: "3px 10px",
                    borderRadius: "1000px",
                    fontWeight: "500",
                    fontSize: "16px",
                    textAlign: "center"
                  }}
                >
                  {userData.name || usernameValid || "Mac OS 7.5"}
                </Text>
                <Text styleSheet={{ marginBottom: "3px", fontSize: "14px", textAlign: "center" }}>
                  Seguidores: {userData.followers}
                </Text>
                <Text styleSheet={{ marginBottom: "3px", fontSize: "14px", textAlign: "center" }}>
                  {userData.location || "Silicon Valley, CA"}
                </Text>
              </Box>
              {/* Photo Area */}
            </Box>
            {/* Conteúdo - FIM */}
        </Window>
    </>
  );
}

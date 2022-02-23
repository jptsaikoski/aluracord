import React from "react";
import { useRouter } from "next/router";
import { Box, Image, Button } from "@skynexui/components";
import appConfig from "../../config.json";

export function MenuBar(props) {
  const loggedUser = props.loggedUser,
    routing = useRouter(),
    [isMenuOpen, setIsMenuOpen] = React.useState('');


  return (
    <>
      <Box
      tag="nav"
        styleSheet={{
          display: {
            xs: "flex",
            lg: "none"
          },
          width: "100%",
          height: "32px",
          backgroundColor: appConfig.theme.colors.neutrals["100"],
          borderBottom: "1px solid",
          borderColor: appConfig.theme.colors.neutrals["700"],
          boxShadow: "inset 0px -2px 1px 0px rgba(0,0,0,0.16)",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          padding: "6px 16px",
        }}
      >
        <Box
          tag="ul"
          styleSheet={{
            width: "100%",
            height: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            tag="li"
            styleSheet={{
              position: "relative",
              height: "20px",
              display: "flex"
            }}
          >
            <Button
              rounded="none"
              styleSheet={{
                backgroundColor: "rgba(0,0,0,0)",
                width: "20px",
                height: "20px",
                padding: "0px",
                backgroundImage: "url(/static/images/apple-icon.png)",
                backgroundSize: "20px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center -2px",
                marginRight: "16px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["900"],
                mainColor: appConfig.theme.colors.neutrals["100"],
                mainColorLight: appConfig.theme.colors.neutrals["100"],
                mainColorStrong: appConfig.theme.colors.neutrals["100"],
              }}
            />
          </Box>


          <Box
            tag="li"
            styleSheet={{
              position: "relative",
              height: "20px",
              display: "flex"
            }}
          >
            <Button
              rounded="none"
              styleSheet={{
                position: "relative",
                backgroundColor: "rgba(0,0,0,0)",
                height: "20px",
                padding: "0px",
                marginRight: "16px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["900"],
                mainColor: appConfig.theme.colors.neutrals["100"],
                mainColorLight: appConfig.theme.colors.neutrals["100"],
                mainColorStrong: appConfig.theme.colors.neutrals["100"],
              }}
              label="Menu"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
            
            {isMenuOpen &&
            <Box
              tag="ul"
              styleSheet={{
                zIndex: "2000",
                position: "absolute",
                top: "25px",
                left: "0",
                padding: "8px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[100],
                border: "1px solid",
                borderColor: appConfig.theme.colors.neutrals["700"],
              }}
            >

              <Box
                tag="li"
                styleSheet={{
                  minWidth: "100px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  styleSheet={{
                    width: "16px",
                    height: "16px",
                    display: "block",
                    marginRight: "8px"
                  }}
                  src={"/static/images/chat-icon-64.png"}
                />
                <Button
                  rounded="none"
                  styleSheet={{
                    position: "relative",
                    backgroundColor: "rgba(0,0,0,0)",
                    padding: "0px",
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["900"],
                    mainColor: appConfig.theme.colors.neutrals["100"],
                    mainColorLight: appConfig.theme.colors.neutrals["100"],
                    mainColorStrong: appConfig.theme.colors.neutrals["100"],
                  }}
                  label="Chat" 
                  onClick={(event) => {
                    routing.push(`/chat?username=${loggedUser}`);
                  }}
                />
              </Box>

              <Box
                tag="li"
                styleSheet={{
                  minWidth: "100px",
                  marginBottom: "8px",
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
                    display: "block",
                    marginRight: "8px"
                  }}
                  src={`https://github.com/${loggedUser}.png`}
                />
                <Button
                  rounded="none"
                  styleSheet={{
                    position: "relative",
                    backgroundColor: "rgba(0,0,0,0)",
                    padding: "0px",
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["900"],
                    mainColor: appConfig.theme.colors.neutrals["100"],
                    mainColorLight: appConfig.theme.colors.neutrals["100"],
                    mainColorStrong: appConfig.theme.colors.neutrals["100"],
                  }}
                  label="Meu Perfil"
                  onClick={(event) => {
                    routing.push(`/profile?username=${loggedUser}`);
                  }}
                />
              </Box>

              <Box
                tag="li"
                styleSheet={{
                  minWidth: "100px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  styleSheet={{
                    width: "16px",
                    height: "16px",
                    display: "block",
                    marginRight: "8px"
                  }}
                  src={"/static/images/about-icon-64.png"}
                />
                <Button
                  rounded="none"
                  styleSheet={{
                    position: "relative",
                    backgroundColor: "rgba(0,0,0,0)",
                    padding: "0px",
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["900"],
                    mainColor: appConfig.theme.colors.neutrals["100"],
                    mainColorLight: appConfig.theme.colors.neutrals["100"],
                    mainColorStrong: appConfig.theme.colors.neutrals["100"],
                  }}
                  label="Sobre"
                  onClick={(event) => {
                    routing.push(`/about?username=${loggedUser}`);
                  }}
                />
              </Box>

            </Box>
            }
          </Box>

        </Box>


        
        

      </Box>


      <Box
      tag="nav"
        styleSheet={{
          minWidth: {
            xs: "auto",
            lg: "60px",
          },
          maxWidth: {
            xs: "",
            lg: "60px",
          },
          minHeight: {
            xs: "60px",
            lg: "auto",
          },
          display: {
            xs: "none",
            lg: "flex"
          },
          flexDirection: "column",
          borderRadius: "2px",
          backgroundColor: appConfig.theme.colors.neutrals[800],
          boxShadow:
            "rgba(4, 4, 5, 0.5) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 2px 5px 5px 0px",
          backgroundColor: appConfig.theme.colors.neutrals["300"],
          border: "1px solid",
          borderColor: appConfig.theme.colors.neutrals["400"],
          padding: "2px",
          marginRight: {
            xs: "0px",
            lg: "16px",
          },
          marginBottom: {
            xs: "16px",
            lg: "0px",
          },
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            borderRadius: "3px",
            backgroundColor: "",
            border: "1px solid",
            borderColor: appConfig.theme.colors.neutrals["400"],
            borderTopColor: appConfig.theme.colors.neutrals["900"],
          }}
        >
          <Box
            rounded="none"
            onClick={(event) => {
              routing.push(`/chat?username=${loggedUser}`);
            }}
            styleSheet={{
              backgroundColor: appConfig.theme.colors.neutrals["300"],
              borderRadius: "2px",
              border: "1px solid",
              borderTopColor: appConfig.theme.colors.neutrals["400"],
              borderLeftColor: appConfig.theme.colors.neutrals["400"],
              borderRightColor: appConfig.theme.colors.neutrals["400"],
              borderBottomColor: appConfig.theme.colors.neutrals["400"],
              boxShadow:
                "inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)",
              width: "52px",
              height: "52px",
              backgroundImage: "url(/static/images/chat-icon-64.png)",
              backgroundSize: "24px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transition: "all 0.1s",
              cursor: "pointer",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals["200"],
              },
            }}
          />

          <Box
            rounded="none"
            onClick={(event) => {
              routing.push(`/profile?username=${loggedUser}`);
            }}
            styleSheet={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: appConfig.theme.colors.neutrals["300"],
              borderRadius: "2px",
              border: "1px solid",
              borderTopColor: appConfig.theme.colors.neutrals["400"],
              borderLeftColor: appConfig.theme.colors.neutrals["400"],
              borderRightColor: appConfig.theme.colors.neutrals["400"],
              borderBottomColor: appConfig.theme.colors.neutrals["400"],
              boxShadow:
                "inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)",
              width: "52px",
              height: "52px",
              transition: "all 0.1s",
              cursor: "pointer",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals["200"],
              },
            }}
          >
            <Image
              styleSheet={{
                width: "24px",
                height: "24px",
                borderRadius: "1px",
                border: "1px solid",
                borderColor: appConfig.theme.colors.neutrals[400],
                display: "block",
              }}
              src={`https://github.com/${loggedUser}.png`}
            />
          </Box>

          <Box
            rounded="none"
            onClick={(event) => {
              routing.push(`/about?username=${loggedUser}`);
            }}
            styleSheet={{
              backgroundColor: appConfig.theme.colors.neutrals["300"],
              borderRadius: "2px",
              border: "1px solid",
              borderTopColor: appConfig.theme.colors.neutrals["400"],
              borderLeftColor: appConfig.theme.colors.neutrals["400"],
              borderRightColor: appConfig.theme.colors.neutrals["400"],
              borderBottomColor: appConfig.theme.colors.neutrals["400"],
              boxShadow:
                "inset 2px 2px 1px 0px rgba(255,255,255,0.5), inset -2px -2px 1px 0px rgba(0,0,0,0.16)",
              width: "52px",
              height: "52px",
              backgroundImage: "url(/static/images/about-icon-64.png)",
              backgroundSize: "24px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transition: "all 0.1s",
              cursor: "pointer",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals["200"],
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

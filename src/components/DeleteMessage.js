import React from "react";
import { Box, Text, Button } from "@skynexui/components";
import appConfig from "../../config.json";

export function DeleteMessage(props) {
  const [isOpen, setIsOpen] = React.useState("");

  return (
    <>
      <Box
        onClick={() => {
          setIsOpen(true);
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
            backgroundColor: appConfig.theme.colors.neutrals["400"],
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
            backgroundColor: appConfig.theme.colors.neutrals["400"],
            marginTop: "0px",
            marginBottom: "0px",
          }}
        ></Box>
      </Box>
      {isOpen && (
        <Box
          styleSheet={{
            zIndex: "1000",
            display: "flex",
            flexDirection: "column",
            borderRadius: "2px",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: "105%",
              sm: "290px",
            },
            height: "150px",
            right: "50%",
            bottom: "50%",
            marginRight: {
              xs: "-52.5%",
              md: "-145px",
            },
            marginBottom: "-75px",
            boxShadow:
              "rgba(4, 4, 5, 0.5) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 2px 5px 5px 0px",
            backgroundColor: appConfig.theme.colors.neutrals["300"],
            border: "1px solid",
            borderColor: appConfig.theme.colors.neutrals["400"],
            padding: "2px",
          }}
        >
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[100],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals["400"],
              borderTopColor: appConfig.theme.colors.neutrals["900"],
            }}
          >
            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals["700"],
                fontWeight: "normal",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Você deseja realmente excluir essa mensagem?
            </Text>

            <Box
              styleSheet={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                colorVariant="neutral"
                label="Não"
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
                  margin: "4px",
                  padding: "32px",
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

              <Button
                colorVariant="neutral"
                label="Sim"
                rounded="none"
                onClick={() => {
                  props.deleteSignal();
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
                  margin: "4px",
                  padding: "32px",
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
          </Box>
        </Box>
      )}
    </>
  );
}

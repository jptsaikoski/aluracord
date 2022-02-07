import React from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button } from "@skynexui/components";
import appConfig from "../../config.json";

export function ChatHeader(props) {
  const routing = useRouter();
  const chatList = props.chatList;

  function alertEx(option) {
    console.log("A opção selecionada foi: " + option);
  }

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
          onClick={() => {
            routing.push(`/`);
          }}
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

        <Select
          optionsList={chatList}
          selectedOption={alertEx}
          fullWidth
          styleSheet={{
              marginLeft: '8px',
          }}
        ></Select>
      </Box>
    </>
  );
}

function Select(props) {
  const optionsList = props.optionsList || ['Global'];
  const fullWidth = props.fullWidth;
  const styleSheet = props.styleSheet || '';

  return (
    <>
      <select 
      className="selector"
      style={styleSheet}
      onChange={(event) => {
        props.selectedOption(event.target.value);
      }}
      >
        {optionsList.map((option) => {
          return (
            <option
              key={option}
              value={option}
              
            >
              {option}
            </option>
          );
        })}
      </select>
      <style jsx>{`
        .selector {
          width: ${fullWidth === true ? "100%" : "auto"};
          padding: 12px;
          background-color: ${appConfig.theme.colors.neutrals["100"]};
          border-radius: 2px;
          border: 1px solid;
          border-color: ${appConfig.theme.colors.neutrals["400"]};
          box-shadow: inset 2px 3px 1px 0px rgba(255, 255, 255, 1),
            inset -2px -3px 1px 0px rgba(0, 0, 0, 0.16);
          padding-top: 6px;
          padding-bottom: 6px;
          max-height: 30px;
          cursor: pointer;
        }

        .selector:focus {
          outline: 0;
        }
      `}</style>
    </>
  );
}

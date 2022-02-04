import React from "react";
import { TextField, Button } from "@skynexui/components";
import appConfig from "../../config.json";
import { SendSticker } from "./SendSticker";

export function MessageInput(props) {
    const [message, setMessage] = React.useState("");

  return (
    <>
      <TextField
        type="text"
        value={message}
        onChange={(event) => {
          const messageValue = event.target.value;
          setMessage(messageValue);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();

            props.sendMessage(message, props.getReplyID);
            setMessage("");
          }
        }}
        placeholder="Escreva sua mensagem aqui..."
        textFieldColors={{
          neutral: {
            mainColor: appConfig.theme.colors.neutrals[400],
            mainColorHighlight: appConfig.theme.colors.neutrals[700],
            textColor: appConfig.theme.colors.neutrals[700],
          },
        }}
        styleSheet={{
          width: "100%",
          resize: "none",
          padding: "6px 8px",
          border: "1px solid",
          borderColor: appConfig.theme.colors.neutrals[400],
          borderRadius: "2px",
          color: appConfig.theme.colors.neutrals[400],
          backgroundColor: appConfig.theme.colors.neutrals[100],
          marginBottom: "-8px",
        }}
      />

      <SendSticker onStickerClick={props.sendSticker} />
      <Button
        colorVariant="neutral"
        label="Enviar"
        rounded="none"
        onClick={() => {
          props.sendMessage(message, props.getReplyID);
          setMessage("");
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
          marginLeft: "8px",
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
    </>
  );
}

import React from "react";
import { Box } from "@skynexui/components";
import appConfig from "../../config.json";

export function Background(props) {
    const [gifUrl, setGifUrl] = React.useState('');
    const changeSignal = props.changeSignal;

    React.useEffect(() => {
        setGifUrl("/static/images/background-1280-30.gif");
    
        const gifTimer = setTimeout(function () {
            setGifUrl('');
        }, 2000);
    },[changeSignal]);

  return (
    <Box
      styleSheet={{
        zIndex: "0",
        display: "flex",
        backgroundColor: "#091B15",
        backgroundImage: "url(/static/images/frame-1.png)",
        minHeight: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        styleSheet={{
          zIndex: "1",
          display: "flex",
          alignItems: { xs: "center", lg: "flex-start" },
          justifyContent: "center",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          backgroundImage: `url(${gifUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100%",
          width: "100%",
          maxHeight: { xs: "calc(100vh + 72px + 16px)", lg: "100vh" },
          padding: {
            xs: "24px",
            md: "24px",
          },
        }}
      >{props.children}</Box>
    </Box>
  );
}

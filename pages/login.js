import { Box} from "@skynexui/components";
import React from "react";
import { Background } from "../src/components/Background";
import { LoginBox } from "../src/components/LoginBox";

export default function PaginaInicial() {
  const [backgroundSignal, setBackgroundSignal] = React.useState('');

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
            maxWidth: "600px"
          }}
        >
            <LoginBox backgroundChange={backgroundChange}/>
        </Box>

      </Background>
    </>
  );
}

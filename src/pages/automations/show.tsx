import React, { useEffect } from "react";
import mermaid from "mermaid";
import Mermaid from "react-mermaid2";
import { Box, Center } from "@chakra-ui/react";

export const AutomationShow = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "base",
      themeVariables: {
        primaryColor: "#4a4a4a",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#4a4a4a",
        secondaryColor: "#6c6c6c",
        secondaryTextColor: "#ffffff",
        secondaryBorderColor: "#6c6c6c",
        tertiaryColor: "#9e9e9e",
        tertiaryTextColor: "#ffffff",
        tertiaryBorderColor: "#9e9e9e",
      },
    });
    setTimeout(() => {
      mermaid.contentLoaded();
    }, 100);    
  }, []);

  return (
    <Center>
      <Box margin="50px">
        <Mermaid
          chart={`graph TD;
            Orchestrator-->AI_Agent;
            AI_Agent-->Tool1[GenAI Tool 1];
            AI_Agent-->Tool2[GenAI Tool 2];
            AI_Agent-->Tool3[GenAI Tool 3];
            AI_Agent-->Tool4[GenAI Tool 4];
          `}
        />
      </Box>
    </Center>
  );
};
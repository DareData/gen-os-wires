import React, { useEffect } from "react";
import mermaid from "mermaid";
import Mermaid from "react-mermaid2";
import { Box, Center } from "@chakra-ui/react";

export const AutomationShow = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
    });
  }, []);

  return (
    <Center>
      <Box width="80%">
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
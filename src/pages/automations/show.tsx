import React, { useEffect } from "react";
import mermaid from "mermaid";
import Mermaid from "react-mermaid2";

export const AutomationShow = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
    });
  }, []);
  return (
    <div >
      <Mermaid
        chart={`graph LR;
A-->B;
B-->C;
B-->D[plop lanflz eknlzeknfz];
      `}
      />
    </div>
  );
};
import React, { useEffect } from "react";
import mermaid from "mermaid";

// Ensure Mermaid component is imported
import Mermaid from "react-mermaid2";

export const AutomationShow = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  return (
    <div>
      <h1>React Mermaid Example</h1>
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
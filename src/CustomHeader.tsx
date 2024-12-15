import React, { useEffect } from "react";
import { HStack, Button } from "@chakra-ui/react";

type CustomHeaderProps = {
    toggleMode: () => void;
    usageMode: "workRoom" | "MonitorRoom";
};

export const CustomHeader: React.FC<CustomHeaderProps> = ({ toggleMode, usageMode }) => {
    return (
        <HStack spacing="10px">
            <Button
                colorScheme={usageMode === "workRoom" ? "blue" : "gray"}
                onClick={toggleMode}
            >
                Work Room
            </Button>
            <Button
                colorScheme={usageMode === "MonitorRoom" ? "blue" : "gray"}
                onClick={toggleMode}
            >
                Monitor Room
            </Button>
        </HStack>
    );
};

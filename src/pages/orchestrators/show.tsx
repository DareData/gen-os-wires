import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import { ConversationList } from "../conversations";
import { ToolList } from "../tools";
import { AgentList } from "../agents";

import { useShow, useList, useTranslate, useMany } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";
import { AutomationShow } from '../automations';

export const OrchestratorShow = () => {
    const translate = useTranslate();
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    const { data: toolsData, isLoading: toolsIsLoading } = useList({
        resource: "tools",
        ids: record?.tools || [],
        queryOptions: {
            enabled: !!record && !!record?.tools?.length,
        },
    });


    return (
        <Show isLoading={isLoading}>
        <>
        <Box marginTop="50px" />
        <Tabs variant='enclosed'>
          <TabList>
            <Tab>Orchestration General Info</Tab>
            <Tab>Conversations</Tab>
            <Tab>Tools</Tab>
            <Tab>Agents</Tab>
            <Tab>Automations</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            {toolsIsLoading && record?.tools?.length ? (
                <>Loading...</>
            ) : (
                <>
                    <Heading as="h5" size="sm" mt={4}>
                        {translate("id")}
                    </Heading>
                    <NumberField value={record?.id ?? ""} />
                    <Heading as="h5" size="sm" mt={4}>
                        {translate("name")}
                    </Heading>
                    <TextField value={record?.name} />
                    <Heading as="h5" size="sm" mt={4}>
                        {translate("tools")}
                    </Heading>
                    {record?.tools?.length ? (
                        <HStack spacing="12px">
                            {toolsData?.data?.map((tools: any) => (
                                <TagField
                                    key={tools?.name}
                                    value={tools?.name}
                                />
                            ))}
                        </HStack>
                    ) : (
                        <></>
                    )}
                </>
            )}
            </TabPanel>
            <TabPanel>
              <ConversationList/>
            </TabPanel>
            <TabPanel>
              <ToolList />
            </TabPanel>
            <TabPanel>
                <AgentList />
            </TabPanel>
            <TabPanel>
              <AutomationShow/> 
            </TabPanel>
          </TabPanels>
        </Tabs>
        </>
        </Show>
    );
};


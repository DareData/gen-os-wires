import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import React, { useState, useMemo, useEffect } from "react";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  useNotificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedHeaderV2
} from "@refinedev/chakra-ui";

import { ChakraProvider, Image, Button } from "@chakra-ui/react";
import { FaBusinessTime, FaCogs, Faphone, FaTools, FaFileAlt, FaDatabase, FaUserSecret, FaComments, FaEnvelope, FaExclamationCircle, FaListAlt, FaChalkboardTeacher, FaBrain, FaRobot } from "react-icons/fa";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";

import {
  BusinessSolutionCreate,
  BusinessSolutionEdit,
  BusinessSolutionList,
  BusinessSolutionShow,
} from "./pages/businessSolutions";

import {
  OrchestratorCreate,
  OrchestratorEdit,
  OrchestratorList,
  OrchestratorShow,
} from "./pages/orchestrators";

import {
  ToolCreate,
  ToolEdit,
  ToolList,
  ToolShow,
} from "./pages/tools";

import {
  DocumentCreate,
  DocumentEdit,
  DocumentList,
  DocumentShow,
} from "./pages/documents";

import {
  IngestionCreate,
  IngestionEdit,
  IngestionList,
  IngestionShow,
} from "./pages/ingestions";

import {
  AgentCreate,
  AgentEdit,
  AgentList,
  AgentShow,
} from "./pages/agents";

import {
  ConversationCreate,
  ConversationEdit,
  ConversationList,
  ConversationShow,
} from "./pages/conversations";

import {
  MessageCreate,
  MessageEdit,
  MessageList,
  MessageShow,
} from "./pages/messages";

import {
  IssueCreate,
  IssueEdit,
  IssueList,
  IssueShow,
} from "./pages/issues";

import {
  EvalSetItemCreate,
  EvalSetItemEdit,
  EvalSetItemList,
  EvalSetItemShow,
} from "./pages/evalSetItems";

import {
  EvalSetCreate,
  EvalSetEdit,
  EvalSetList,
  EvalSetShow,
} from "./pages/evalSets";

import {
  LlmBrokerCreate,
  LlmBrokerEdit,
  LlmBrokerList,
  LlmBrokerShow,
} from "./pages/llmBrokers";

import {
  LlmCreate,
  LlmEdit,
  LlmList,
  LlmShow,
} from "./pages/llms";

import {
  MonitorRoom
} from "./pages/monitorRoom";

import {
  WorkRoom
} from "./pages/workRoom";


import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";


function App() {
  const { t, i18n } = useTranslation();
  const [usageMode, setUsageMode] = useState<IMode>("WorkRoom");
  const [lastMonitorResource, setLastMonitorResource] = useState<string>("/businessSolutions");
  const [lastWorkResource, setLastWorkResource] = useState<string>("/conversations");

  type IMode = "WorkRoom" | "MonitorRoom";

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const toggleMode = (navigate) => {
    console.log("toogle", lastMonitorResource, lastWorkResource);
    setUsageMode((prevMode) => {
      if (prevMode === "WorkRoom") {
        //setLastWorkResource(location.pathname);
        navigate(lastMonitorResource);
        return "MonitorRoom";
      } else {
        //setLastMonitorResource(location.pathname);
        navigate(lastWorkResource);
        return "WorkRoom";
      }
    });
  };

  const monitorResources = useMemo(() => [
    {
      name: "businessSolutions",
      list: "businessSolutions",
      create: "businessSolutions/create",
      edit: "businessSolutions/edit/:id",
      show: "businessSolutions/show/:id",
      meta: {
        canDelete: true,
        icon: <FaBusinessTime />,
      },
    },
    {
      name: "orchestrators",
      list: "orchestrators",
      create: "orchestrators/create",
      edit: "orchestrators/edit/:id",
      show: "orchestrators/show/:id",
      meta: {
        canDelete: true,
        icon: <FaCogs />,
      },
    },
    {
      name: "agents",
      list: "agents",
      create: "agents/create",
      edit: "agents/edit/:id",
      show: "agents/show/:id",
      meta: {
        canDelete: true,
        icon: <FaUserSecret/>,
      },
    },
    {
      name: "Details",
      meta: {
        canDelete: true,
        icon: <FaListAlt />,
      },
    },
  
    {
      name: "ingestions",
      list: "ingestions",
      create: "ingestions/create",
      edit: "ingestions/edit/:id",
      show: "ingestions/show/:id",
      meta: {
        canDelete: true,
        icon: <FaDatabase />,
        parent: "Details",
      },
    },
    {
      name: "issues",
      list: "issues",
      create: "issues/create",
      edit: "issues/edit/:id",
      show: "issues/show/:id",
      meta: {
        canDelete: true,
        icon: <FaExclamationCircle />,
        parent: "Details",
      },
    },
    {
      name: "evalSetItems",
      list: "evalSetItems",
      create: "evalSetItems/create",
      edit: "evalSetItems/edit/:id",
      show: "evalSetItems/show/:id",
      meta: {
        canDelete: true,
        icon: <FaListAlt />,
        parent: "Details",
      },
    },
    {
      name: "evalSets",
      list: "evalSets",
      create: "evalSets/create",
      edit: "evalSets/edit/:id",
      show: "evalSets/show/:id",
      meta: {
        canDelete: true,
        icon: <FaBrain />,
        parent: "Details",
      },
    },
    {
      name: "llmBrokers",
      list: "llmBrokers",
      create: "llmBrokers/create",
      edit: "llmBrokers/edit/:id",
      show: "llmBrokers/show/:id",
      meta: {
        canDelete: true,
        icon: <FaRobot />,
        parent: "Details",
      },
    },
    {
      name: "llms",
      list: "llms",
      create: "llms/create",
      edit: "llms/edit/:id",
      show: "llms/show/:id",
      meta: {
        canDelete: true,
        icon: <FaRobot />,
        parent: "Details",
      },
    }], []);

  const workResources = useMemo(() => [
    {
      name: "conversations",
      list: "conversations",
      create: "conversations/create",
      edit: "conversations/edit/:id",
      show: "conversations/show/:id",
      meta: {
        canDelete: true,
        icon: <FaComments />,
      },
    },
    {
      name: "messages",
      list: "messages",
      create: "messages/create",
      edit: "messages/edit/:id",
      show: "messages/show/:id",
      meta: {
        canDelete: true,
        icon: <FaEnvelope />,
      },
    },
    {
      name: "cockpit",
      list: "cockpit",
      meta: {
        canDelete: true,
        icon: <FaEnvelope />,
      },
    }
  ], []);

  const resources = useMemo(() => {
    if (usageMode === "MonitorRoom") {
        return monitorResources;
    } else if (usageMode === "WorkRoom") {
        return workResources;
    }
    return []; 
}, [usageMode, monitorResources, workResources]); 

  return (
    <BrowserRouter>
      <RefineKbarProvider >
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider>
          <Refine
            dataProvider={dataProvider("https://my-json-server.typicode.com/nunobbras/gen-os-wires")}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            Title={({ collapsed }) => (
              <div>
                  {<Image maxHeight="30px" src="./images/logo_black_dd.png" alt="Logo" />}
                  {!collapsed && <h3><b>Gen-OS</b> Wireframes</h3>}
              </div>
            )}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={() => (
                        <Header 
                        toggleMode={toggleMode} 
                        usageMode={usageMode} 
                        setLastMonitorResource ={setLastMonitorResource} 
                        setLastWorkResource ={setLastWorkResource}
                        />
                    )}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />
                  <Route path="WorkRoom">
                    <Route index element={<WorkRoom />} />
                  </Route>
                  <Route path="businessSolutions">
                      <Route index element={<BusinessSolutionList />} />
                      <Route path="create" element={<BusinessSolutionCreate />} />
                      <Route path="edit/:id" element={<BusinessSolutionEdit />} />
                      <Route path="show/:id" element={<BusinessSolutionShow />} />
                    </Route>
                    <Route path="orchestrators">
                      <Route index element={<OrchestratorList />} />
                      <Route path="create" element={<OrchestratorCreate />} />
                      <Route path="edit/:id" element={<OrchestratorEdit />} />
                      <Route path="show/:id" element={<OrchestratorShow />} />
                    </Route>
                    <Route path="tools">
                      <Route index element={<ToolList />} />
                      <Route path="create" element={<ToolCreate />} />
                      <Route path="edit/:id" element={<ToolEdit />} />
                      <Route path="show/:id" element={<ToolShow />} />
                    </Route>
                    <Route path="documents">
                      <Route index element={<DocumentList />} />
                      <Route path="create" element={<DocumentCreate />} />
                      <Route path="edit/:id" element={<DocumentEdit />} />
                      <Route path="show/:id" element={<DocumentShow />} />
                    </Route>
                    <Route path="ingestions">
                      <Route index element={<IngestionList />} />
                      <Route path="create" element={<IngestionCreate />} />
                      <Route path="edit/:id" element={<IngestionEdit />} />
                      <Route path="show/:id" element={<IngestionShow />} />
                    </Route>
                    <Route path="agents">
                      <Route index element={<AgentList />} />
                      <Route path="create" element={<AgentCreate />} />
                      <Route path="edit/:id" element={<AgentEdit />} />
                      <Route path="show/:id" element={<AgentShow />} />
                    </Route>
                    <Route path="conversations">
                      <Route index element={<ConversationList />} />
                      <Route path="create" element={<ConversationCreate />} />
                      <Route path="edit/:id" element={<ConversationEdit />} />
                      <Route path="show/:id" element={<ConversationShow />} />
                    </Route>
                    <Route path="messages">
                      <Route index element={<MessageList />} />
                      <Route path="create" element={<MessageCreate />} />
                      <Route path="edit/:id" element={<MessageEdit />} />
                      <Route path="show/:id" element={<MessageShow />} />
                    </Route>
                    <Route path="issues">
                      <Route index element={<IssueList />} />
                      <Route path="create" element={<IssueCreate />} />
                      <Route path="edit/:id" element={<IssueEdit />} />
                      <Route path="show/:id" element={<IssueShow />} />
                    </Route>
                    <Route path="evalSetItems">
                      <Route index element={<EvalSetItemList />} />
                      <Route path="create" element={<EvalSetItemCreate />} />
                      <Route path="edit/:id" element={<EvalSetItemEdit />} />
                      <Route path="show/:id" element={<EvalSetItemShow />} />
                    </Route>
                    <Route path="evalSets">
                      <Route index element={<EvalSetList />} />
                      <Route path="create" element={<EvalSetCreate />} />
                      <Route path="edit/:id" element={<EvalSetEdit />} />
                      <Route path="show/:id" element={<EvalSetShow />} />
                    </Route>
                    <Route path="llmBrokers">
                      <Route index element={<LlmBrokerList />} />
                      <Route path="create" element={<LlmBrokerCreate />} />
                      <Route path="edit/:id" element={<LlmBrokerEdit />} />
                      <Route path="show/:id" element={<LlmBrokerShow />} />
                    </Route>
                    <Route path="llms">
                      <Route index element={<LlmList />} />
                      <Route path="create" element={<LlmCreate />} />
                      <Route path="edit/:id" element={<LlmEdit />} />
                      <Route path="show/:id" element={<LlmShow />} />
                    </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

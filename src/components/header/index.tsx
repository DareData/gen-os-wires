import {
  Avatar,
  Box,
  type BoxProps,
  HStack,
  Icon,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import {
  HamburgerMenu,
  type RefineThemedLayoutV2HeaderProps,
} from "@refinedev/chakra-ui";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import { IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";
import { FaBusinessTime, FaCogs, FaTools, FaFileAlt, FaPhoneAlt, FaDatabase, FaUserSecret, FaComments, FaEnvelope, FaExclamationCircle, FaListAlt, FaChalkboardTeacher, FaBrain, FaRobot, FaSmile } from "react-icons/fa";
import i18n from "i18next";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps & { setLastWorkResource: () => void; setLastMonitorResource: () => void; toggleMode: () => void; usageMode: string }> = ({
  sticky,
  setLastWorkResource,
  setLastMonitorResource,
  toggleMode, 
  usageMode
}) => {
  const { data: user } = useGetIdentity<IUser>();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark",
  );
  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();
  const navigate = useNavigate();
  const location = useLocation();
  
  let stickyProps: BoxProps = {};
  if (sticky) {
    stickyProps = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }


  // useEffect(() => {
  //     if (usageMode === "MonitorRoom") {
  //       navigate(lastMonitorResource);
  //     } else if (usageMode === "WorkRoom") {
  //       navigate(lastWorkResource);
  //     }
  //   }, [usageMode, lastMonitorResource, lastWorkResource]);
  
  // useEffect(() => {
  //   console.log("location.pathname", location.pathname);
  //   if (usageMode === "MonitorRoom") {
  //     setLastMonitorResource(location.pathname);
  //   } else if (usageMode === "WorkRoom") {
  //     setLastWorkResource(location.pathname);
  //   }
  // }, []);
  


  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...stickyProps}
    >
      <HamburgerMenu />

      <HStack>
      <Menu>
      <HStack spacing="10px">
            <Button
                colorScheme={usageMode === "MonitorRoom" ? "blue" : "gray"}
                onClick={()=>toggleMode(navigate)}
                leftIcon={<FaChalkboardTeacher />}
                variant="solid"
            >
                Monitor Room
            </Button>
            <Button
                colorScheme={usageMode === "WorkRoom" ? "blue" : "gray"}
                onClick={()=>toggleMode(navigate)}
                leftIcon={<FaPhoneAlt />}
                variant="solid"
            >
                Work Room
            </Button>
        </HStack>
      </Menu>
      </HStack>

      <HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            data-test-id="language-button"
            aria-label={currentLocale}
            icon={<IconLanguage />}
            variant="ghost"
          />
          <MenuList>
            {[...(i18n.languages ?? [])].sort().map((lang: string) => (
              <MenuItem
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                }}
                value={lang}
                color={lang === currentLocale ? "green" : undefined}
                icon={
                  <Avatar src={`/images/flags/${lang}.svg`} h={18} w={18} />
                }
              >
                {lang === "en" ? "English" : "German"}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <IconButton
          variant="ghost"
          aria-label="Toggle theme"
          onClick={toggleColorMode}
        >
          <Icon
            as={colorMode === "light" ? IconMoon : IconSun}
            w="24px"
            h="24px"
          />
        </IconButton>

        {(user?.avatar || user?.name) && (
          <HStack>
            {user?.name && (
              <Text size="sm" fontWeight="bold">
                {user.name}
              </Text>
            )}
            <Avatar size="sm" name={user?.name} src={user?.avatar} />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

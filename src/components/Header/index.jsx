import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Assignment,
  CalendarMonth,
  FolderShared,
  Logout,
  Medication,
  Person,
  Reply,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { theme } from "../../global/theme";
import { AuthContext } from "../../context/auth";

import Text from "../Text";

import {
  Container,
  LoggedContainer,
  UnloggedContainer,
  HeaderWrapper,
  Divider,
  NavLinkContainer,
  UserInfo,
  NavItem,
} from "./styles";

export const menuLinks = [
  { link: "/home", label: "Home" },
  { link: "/pacientes", label: "Pacientes", icon: FolderShared },
  { link: "/consultas", label: "Consultas", icon: CalendarMonth },
  { link: "/prescricao", label: "Prescrições", icon: Assignment },
  { link: "/encaminhamentos", label: "Encaminhamentos", icon: Reply },
  { link: "/farmacos", label: "Fármacos", icon: Medication },
];

const LoggedHeader = () => {
  const [accountAnchor, setAccountAnchor] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  const openAccount = Boolean(accountAnchor);
  const openMenu = Boolean(menuAnchor);

  const getNameInitials = () => {
    const nameSplited = user?.name?.split(" ").filter((partName) => !!partName);

    if (nameSplited.length && user.name) {
      if (nameSplited.length > 1) {
        return `${nameSplited[0][0]}${
          nameSplited[nameSplited.length - 1][0]
        }`.toUpperCase();
      }

      return nameSplited[0][0].toUpperCase();
    }

    return "US";
  };

  return (
    <LoggedContainer>
      <HeaderWrapper>
        <IconButton
          id="menu-mobile"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <img
          src="/assets/logo/white.png"
          alt="Prescreva Farma logo"
          onClick={() => navigate("/home")}
        />
        <UserInfo>
          <Box
            display="flex"
            alignItems="center"
            onClick={(e) => setAccountAnchor(e.currentTarget)}
            sx={{ cursor: "pointer" }}
          >
            <IconButton>
              <Avatar>{getNameInitials()}</Avatar>
            </IconButton>
            <Text color="white" variant="small" fontWeight={700}>
              {user.name}
            </Text>
          </Box>
        </UserInfo>
      </HeaderWrapper>
      <Divider />
      <NavLinkContainer>
        {menuLinks.map((m) => (
          <Link to={m.link} key={m.link}>
            <NavItem active={location.pathname.includes(m.link)}>
              <Text color="white" fontWeight={700}>
                {m.label}
              </Text>
            </NavItem>
          </Link>
        ))}
      </NavLinkContainer>
      <Menu
        open={openAccount}
        anchorEl={accountAnchor}
        onClose={() => setAccountAnchor(null)}
        onClick={() => setAccountAnchor(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 22,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Minha conta
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        open={openMenu}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        onClick={() => setMenuAnchor(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 15,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuLinks.map((menuLink) => (
          <Link to={menuLink.link} key={menuLink.link}>
            <MenuItem
              sx={{
                background: location.pathname.includes(menuLink.link)
                  ? theme.colors.quartiary_blue
                  : "",
              }}
            >
              {menuLink.label}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </LoggedContainer>
  );
};

const UnloggedHeader = () => {
  return (
    <UnloggedContainer>
      <img src="/assets/logo/white.png" alt="Prescreva Farma logo" />
    </UnloggedContainer>
  );
};

export const Header = () => {
  const { user } = useContext(AuthContext);

  return <Container>{user ? <LoggedHeader /> : <UnloggedHeader />}</Container>;
};

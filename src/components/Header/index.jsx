import { useContext, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

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
import {
  Assignment,
  CalendarMonth,
  FolderShared,
  Logout,
  Medication,
  Person,
  Reply,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const menuLinks = [
  { link: "/home", label: "Home" },
  { link: "/pacientes", label: "Pacientes", icon: FolderShared },
  { link: "/consultas", label: "Consultas", icon: CalendarMonth },
  { link: "/prescricao", label: "Prescrições", icon: Assignment },
  { link: "/encaminhamentos", label: "Encaminhamentos", icon: Reply },
  { link: "/farmacos", label: "Fármacos", icon: Medication },
];

const LoggedHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LoggedContainer>
      <HeaderWrapper>
        <img
          src="/assets/logo/white.png"
          alt="Prescreva Farma logo"
          onClick={() => navigate("/home")}
        />
        <UserInfo onClick={handleClick}>
          <IconButton>
            <Avatar>LR</Avatar>
          </IconButton>
          <Button variant="text" sx={{ padding: 0 }}>
            <Text color="white" variant="small" fontWeight={700}>
              Lucas Rezende
            </Text>
          </Button>
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
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
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
              right: 15,
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

  return <Container>{!user ? <LoggedHeader /> : <UnloggedHeader />}</Container>;
};

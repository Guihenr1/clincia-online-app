import { FC, MouseEvent, useState } from "react";
import useStyles from "./styles";
import { AppBar, Box, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface Menu {
  text: string;
  onClick: (event: any) => void;
}

interface HeaderProps {
  menu: Menu[];
  handleClickLogout: Function;
}

const Header: FC<HeaderProps> = ({ menu, handleClickLogout }) => {
  const s = useStyles();
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AppBar>
      <Toolbar>
        <Box marginTop={2} marginBottom={2} className={s.classes.header}>
          <img src="logo.png" alt="logo" />
          <Tabs
            className={s.classes.margin}
            value={tab}
            textColor="inherit"
            onChange={handleChange}
          >
            {menu.map((item, index) => (
              <Tab
                label={item.text}
                key={index}
                onClick={(e) => item.onClick(e)}
              />
            ))}
          </Tabs>
          <IconButton
            id="logout"
            color="inherit"
            onClick={() => handleClickLogout()}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.defaultProps = {};

export default Header;

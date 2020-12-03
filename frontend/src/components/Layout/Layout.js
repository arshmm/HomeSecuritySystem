import React, { Fragment, useState } from "react";
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GroupSharpIcon from "@material-ui/icons/GroupSharp";
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp";
import LinkedCameraSharpIcon from "@material-ui/icons/LinkedCameraSharp";
import LockSharpIcon from "@material-ui/icons/LockSharp";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  list: {
    width: 230,
  },
  appBarColor: {
    backgroundColor: "black",
  },
  listSyle: {
    marginLeft: "1rem",
  },
}));

const Layout = (props) => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const aloading = useSelector((state) => state.auth.loading);
  const listItem = [
    { key: 1, name: "dashboard", icon: <LinkedCameraSharpIcon /> },
    { key: 2, name: "users", icon: <GroupSharpIcon /> },
    { key: 3, name: "detections", icon: <VisibilitySharpIcon /> },
  ];
  const drawerToggle = () => {
    setDrawer(!drawer);
  };
  const sendToItem = (name) => {
    props.history.push(`/${name}`);
  };
  const logoutBtn = () => {
    dispatch(logout());
  };
  const createListItem = (item) => {
    return (
      <ListItem key={item.key} onClick={() => sendToItem(item.name)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>{item.name}</ListItemText>
      </ListItem>
    );
  };
  const db = aloading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBarColor}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={drawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              HomeSec
            </Typography>
            <Button color="inherit" onClick={logoutBtn}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div onClick={drawerToggle}>
          <Drawer anchor="left" open={drawer}>
            <div className={classes.list}>
              <div className={classes.toolbarHeader}>
                {drawer && (
                  <div style={{ margin: "auto" }}>
                    <LockSharpIcon />
                  </div>
                )}
                <IconButton onClick={drawerToggle}>
                  {drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>{listItem.map((item) => createListItem(item))}</List>
            </div>
          </Drawer>
        </div>

        <Container>
          <main>{props.children}</main>
        </Container>
      </div>
    </Fragment>
  );
  return db;
};

export default withRouter(Layout);

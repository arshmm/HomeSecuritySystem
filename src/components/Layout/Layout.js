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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";

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
  listIt: {
    width: "125",
  },
}));

const Layout = (props) => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const drawerToggle = () => {
    setDrawer(!drawer);
  };
  return (
    <Fragment>
      <div onClick={drawerToggle} className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={drawerToggle}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawer}>
          <div className={classes.toolbarHeader}>
            {drawer && (
              <Typography variant="h6" noWrap>
                HomeSec
              </Typography>
            )}
            <IconButton onClick={drawerToggle}>
              {drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.listIt}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText>henlo</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText>henlo</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText>henlo</ListItemText>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <Container>
          <main>{props.children}</main>
        </Container>
      </div>
    </Fragment>
  );
};

export default Layout;

import React, { Fragment, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postUser } from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";
import CModal from "../../components/CModal/CModal";
import FormDialog from "../../components/FormDialog/FormDialog";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  headingDiv: {
    display: "flex",
  },
  heading: {
    flexGrow: 1,
  },
  mediaCard: {
    width: "19rem",
  },
  media: {
    width: "15rem",
    padding: "10%", // 16:9
  },
});

const User = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [fdialog, setFdialog] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [photoIndex, setPhotoIndex] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, data } = user;
  useEffect(() => {
    if (token) {
      dispatch(getUsers(token));
      setFetchData(false);
    }
  }, [token, fetchData]);

  const handleSubmit = (formData) => {
    dispatch(postUser(formData, token));
    setFetchData(true);
  };
  const viewPhoto = (pindex) => {
    setModal(true);
    let path = `http://localhost:5000/${data[pindex].image}`;
    setPhotoIndex(path);
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.headingDiv}>
            <h2 className={classes.heading}>Users</h2>
            <Button color="inherit" onClick={() => setFdialog(true)}>
              Add user
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Photo</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((item, pindex) => (
                    <StyledTableRow key={item.name}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          color="inherit"
                          onClick={() => viewPhoto(pindex)}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {fdialog && (
            <FormDialog
              dialog={fdialog}
              setDialog={setFdialog}
              handleSubmit={handleSubmit}
            />
          )}
          {modal && (
            <CModal modal={modal} setModal={setModal}>
              <Card className={classes.mediaCard}>
                <img className={classes.media} src={photoIndex} alt="user" />
              </Card>
            </CModal>
          )}
        </Fragment>
      )}
    </Layout>
  );
};

export default User;

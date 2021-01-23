import React, { Fragment, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
} from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { clearDetections, fetchDetections } from "../../store/actions";
import Spinner from "../../components/Spinner/Spinner";

import CModal from "../../components/CModal/CModal";

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
  mediaCard: {
    width: "19rem",
  },
  media: {
    width: "15rem",
    padding: "10%", // 16:9
  },
  headingDiv: {
    display: "flex",
  },
  heading: {
    flexGrow: 1,
  },
  topButton: {
    margin: "1rem",
  },
});

const Detections = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [photoIndex, setPhotoIndex] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const detection = useSelector((state) => state.detection);
  const { loading, data } = detection;

  useEffect(() => {
    dispatch(fetchDetections(token));
    return () => {};
  }, [token]);

  const viewPhoto = (pindex) => {
    setModal(true);
    let path = `http://localhost:5000/${data[pindex].image}`;
    setPhotoIndex(path);
  };
  const clearHistory = () => {
    dispatch(clearDetections(token));
  };
  const fetchNewData = () => {
    dispatch(fetchDetections(token));
  };
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className={classes.headingDiv}>
            <h2 className={classes.heading}>Detections</h2>
            <Button
              className={classes.topButton}
              color="inherit"
              onClick={fetchNewData}
            >
              Fetch Detections
            </Button>
            <Button
              className={classes.topButton}
              color="inherit"
              onClick={clearHistory}
            >
              Clear history
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Time</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, pindex) => (
                  <StyledTableRow key={item.name}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.time}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.name.includes("unknown") ? (
                        <Button
                          color="inherit"
                          onClick={() => viewPhoto(pindex)}
                        >
                          Show
                        </Button>
                      ) : null}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default Detections;

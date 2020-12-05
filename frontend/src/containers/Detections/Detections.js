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
} from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetections } from "../../store/actions";
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
});

const Detections = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const detection = useSelector((state) => state.detection);
  const { loading, data } = detection;

  useEffect(() => {
    dispatch(fetchDetections(token));
    return () => {};
  }, [token]);
  const viewPhoto = () => {
    setModal(true);
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>Detections</h2>
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
                {data.map((item) => (
                  <StyledTableRow key={item.name}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.time}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.name.includes("unknown") ? (
                        <Button color="inherit" onClick={viewPhoto}>
                          Show
                        </Button>
                      ) : null}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {modal && <CModal modal={modal} setModal={setModal}></CModal>}
        </Fragment>
      )}
    </Layout>
  );
};

export default Detections;

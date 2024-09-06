import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import style from './style.module.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DlUpdateStuatus, DeleteDl, dlUserDatas } from '../../../../actions/dlAction';

const ViewDlUsers = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Changed rows per page to 5
    const [rows, setRows] = useState([]);
    const [useDlData, setUserDlData] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { userId } = useParams();

    useEffect(() => {
        const Obj = {
            UserId: userId
        }
        dispatch(dlUserDatas(Obj))
            .then((data) => {
                if (data.length !== 0) {
                    setUserDlData(data)
                }
            })
            .catch((error) => {
                console.error('Error occure in dluserData function', error);
            })
    }, [dispatch]);

    const handelStatusUpdateApproved = (dlid, status) => {
        const obj = {
            DlId: dlid,
            Status: status
        }
        dispatch(DlUpdateStuatus(obj));

        const Obj = {
            UserId: userId
        }
        dispatch(dlUserDatas(Obj))
            .then((data) => {
                if (data.length !== 0) {
                    setUserDlData(data)
                }
            })
            .catch((error) => {
                console.error('Error occure in dluserData function', error);
            })
    }

    const handelDeletDl = (_id) => {
        const obj = {
            Id: _id
        }

        dispatch(DeleteDl(obj))

        const Obj = {
            UserId: userId
        }
        dispatch(dlUserDatas(Obj))
            .then((data) => {
                if (data.length !== 0) {
                    setUserDlData(data)
                }
            })
            .catch((error) => {
                console.error('Error occure in dluserData function', error);
            })
    }

    return (
        <Grid>
            <Grid className={style.container}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bolder' }}>Sl.No</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bolder' }}>Adhaar Number</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bolder' }}>Pan Number</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bolder' }}>DL</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bolder' }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bolder' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {useDlData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row._id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.Adhaar}</TableCell>
                                <TableCell align="center">{row.Pan}</TableCell>
                                <TableCell align="center">{row.Dl}</TableCell>
                                <TableCell align="center">
                                    {row.Status}
                                </TableCell>
                                <TableCell align="center" sx={{ justifyContent: 'center' }}>
                                    {row.Status === 'Pending' ? (
                                        <div>
                                            <CheckBoxIcon className={style.CheckBoxIcon} onClick={() => handelStatusUpdateApproved(row._id, 'Approved')} />
                                            <CancelIcon className={style.CancelIcon} onClick={() => handelStatusUpdateApproved(row._id, 'Rejected')} />
                                        </div>
                                    ) : (
                                        <DeleteForeverIcon className={style.DeleteIcon} onClick={() => handelDeletDl(row._id)} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={useDlData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
}

export default ViewDlUsers;

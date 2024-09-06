import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllUser } from '../../../actions/dlAction';
import { DeleteDlUserMany } from '../../../actions/authAction';

const columns = [
  { id: 'no', label: 'Index No.', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'Phone', label: 'Phone', minWidth: 13 },
  { id: 'EmailId', label: 'EmailId', minWidth: 9, align: 'right' },
  { id: 'Gender', label: 'Gender', align: 'right' },
];

const CustomTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletedRow, setDeletedRow] = useState({});


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const fetchDlUsers = async () => {
    try {
      const response = await dispatch(getAllUser());
      setRows(response);
    } catch (error) {
      console.error('Error fetching DlUsers:', error);
    }
  };

  useEffect(() => {
    fetchDlUsers();
  }, []);

  const handleDeleteClick = (rowIndex, row) => {
    setSelectedRow(rowIndex);
    setOpenDialog(true);
    setDeletedRow(row);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow !== null) {
      // Perform delete action here with selectedRow
      const obj = {
        Id: deletedRow._id
      }
      dispatch(DeleteDlUserMany(obj))
        .then(() => {
          setOpenDialog(false);
          // Update rows state after deletion if needed
          const updatedRows = [...rows];
          updatedRows.splice(selectedRow, 1);
          setRows(updatedRows);
          setSelectedRow(null);
          fetchDlUsers();
        })
        .catch((error) => {
          console.error('error in dlUserMany', error);
        })
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  return (
    <div style={{ width: '84%' }}>
      <Paper sx={{ marginTop: '3rem', marginLeft: '5rem', sboxShadow: '0px 0px 6px 0px #7c7676' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No Records Found
                  </TableCell>
                </TableRow>
              ) : (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell align='right'>{row.email}</TableCell>
                      <TableCell align='right'>{row.gender}</TableCell>
                      <TableCell>
                        <IconButton aria-label="preview" color="primary" onClick={() => navigate(`/viewUserDl/${row._id}`)}>
                          <PreviewIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(index, row)}>
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {deletedRow.email}?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default CustomTable;

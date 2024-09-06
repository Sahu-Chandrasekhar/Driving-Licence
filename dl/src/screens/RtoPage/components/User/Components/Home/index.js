import React, { useEffect, useState } from 'react';
import './index.css'
// import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button, IconButton } from '@mui/material';
import AddDl from './addDl';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dlUserDatas } from '../../../../../../actions/dlAction'
import { userLogout } from '../../../../../../actions/authAction'

// import AddDl from './addDl';
const columns = [
  { id: 'no', label: 'Index No.', minWidth: 170 },
  { id: 'adhaar', label: 'Adhaar Number', minWidth: 13 },
  {
    id: 'pan',
    label: 'Pan Card Number',
    minWidth: 9,
    align: 'right',
  },
  {
    id: 'DL',
    label: 'Driving Licence',
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'right',
  },
];

const Home = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const User_Details = useSelector(state => state.auth.userData);
  const [userData, setUserData] = useState({});

  //pagination----------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //logout------------
  // function handleLogout() {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('loginTimestamp');
  //   navigate('/login');
  //   setUserData({});
  // }

  const handelLogout = () => {
    dispatch(userLogout())

  }

  //dilog-----------
  const [dilogOpen, setDilogOpen] = useState(false);
  function handelOpen(value) {
    setDilogOpen(true)
  }

  const [formData, setFormData] = useState({
    Id: '',
    Adhaar: '',
    Pan: '',
    Dl: '',
    Status: 'Pending',
  });

  useEffect(() => {
    const data = localStorage.getItem('user');
    const parsedData = JSON.parse(data);
    setUserData(parsedData);
    setFormData(prevFormData => ({
      ...prevFormData,
      Id: parsedData?._id || '',
    }));
  }, []);

  const handleUserDl = async () => {
    try {
      const obj = {
        UserId: User_Details?._id
      }
      await dispatch(dlUserDatas(obj))
      .then ((data) => {
          setRows(data || [])
      }) .catch((error) => {
          console.error('Error fetching DL users', error)
      })
    } catch (error) {
      console.error('Error fetching DL users:', error);
    }
  };

  useEffect(() => {
    handleUserDl();
    // setRows(dlUsers_Details || []);
  }, [dispatch]);


  return (
    <div>

      <div className='nav-bar'>

        <div class="card" style={{ width: '18rem' }}>
          <div className="card-header">
            <p className='card-titel'> Dl user detail</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Name: <span>{userData.name}</span></li>
            <li className="list-group-item">Number: <span>{userData.phone}</span></li>
            <li className="list-group-item">Email: <span>{userData.email}</span></li>
            <li className="list-group-item">Gender: <span>{userData.gender}</span></li>
          </ul>
        </div>
        <div className='logout'>
          <IconButton aria-label="logout" onClick={handelLogout}>
            <ExitToAppIcon style={{ float: 'right', marginTop: '3rem' }} />
          </IconButton>
        </div>
      </div>

      <Paper sx={{ marginTop: '3rem', marginLeft: '5rem', width: '52rem', boxShadow: '0px 0px 6px 0px #7c7676' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Driving Licence Detailes
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  <Button className='apply' onClick={handelOpen}>apply now</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{row.Adhaar}</TableCell>
                        <TableCell align='right'>{row.Pan}</TableCell>
                        <TableCell align='right'>{row.Dl}</TableCell>
                        <TableCell align='right'>{row.Status}</TableCell>
                        {/* Add more TableCell components for additional columns */}
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

        {dilogOpen && <AddDl dilogOpen={dilogOpen} setDilogOpen={setDilogOpen} formData={formData} setFormData={setFormData} handleUserDl={handleUserDl}/>}

      </Paper>



    </div>

  )
}

export default Home

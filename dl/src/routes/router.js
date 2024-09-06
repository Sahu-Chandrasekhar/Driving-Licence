import React, { useState } from 'react';
import styles from './style.module.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import PrivateRoute from '../routes/privateRoute';
import { Box } from '@mui/material';
import Dashboard from '../screens/RtoPage/DashBoard';
import Home from '../screens/RtoPage/components/User/Components/Home';
import Drawer from '../screens/RtoPage/components/Admin/components/Drawer';
import ViewUserDl from '../screens/RtoPage/DashBoard/viewUsersDl/index';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const [selectMenu, setSelectMenu] = useState('') 
    let isAuthenticated = useSelector(state => state.auth.userData);

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route element={<PrivateRoute />} >
                    {isAuthenticated && isAuthenticated.authType === "Admin" ? (
                        <>
                            <Route
                                path="/"
                                element={
                                    <Box sx={{ display: 'flex' }}>
                                        <Drawer
                                            setSelectMenu={setSelectMenu}
                                            selectMenu={selectMenu === '' ? 'Dashboard' : selectMenu}
                                        />
                                        <Box
                                            component="main"
                                            className={styles.routerMainBox}
                                        >
                                            <Dashboard />
                                        </Box>
                                    </Box>
                                }
                            />

                            <Route
                                path="/viewUserDl/:userId"
                                element={
                                    <Box sx={{ display: 'flex' }}>
                                        <Drawer
                                            setSelectMenu={setSelectMenu}
                                            selectMenu={selectMenu === '' ? 'ViewUserDl' : selectMenu}
                                        />
                                        <Box
                                            component="main"
                                            className={styles.routerMainBox}
                                        >
                                            <ViewUserDl />
                                        </Box>
                                    </Box>
                                }
                            />
                        </>
                    ) : (
                        <Route path='/' element={<Home />} />
                    )}
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRouter;




// <Route
// path="/dashboard"
// element={
//     <Box sx={{ display: 'flex' }}>
//         <Drawer
//             setSelectMenu={setSelectMenu}
//             selectMenu={selectMenu === '' ? 'Dashboard' : selectMenu}
//         />

//         <Box
//             component="main"
//             className={styles.routerMainBox}
//         >
//             <Dashboard />
//         </Box>
//     </Box>
// } />

// <Route
// path="/viewUserDl/:userId"
// element={
//     <Box sx={{ display: 'flex' }}>
//         <Drawer
//             setSelectMenu={setSelectMenu}
//             selectMenu={selectMenu === '' ? 'ViewUserDl' : selectMenu}
//         />

//         <Box
//             component="main"
//             className={styles.routerMainBox}
//         >
//             <ViewUserDl />
//         </Box>
//     </Box>
// } />

// <Route path="/drawer" element={<Drawer />} />
// <Route path='/home' element={<Home />} />
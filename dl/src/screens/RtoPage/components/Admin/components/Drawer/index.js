import * as React from 'react';
import styles from './style.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Sarathi from '../../../../../../assets/sarathi.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
// import DriveEtaIcon from '@mui/icons-material/DriveEta';
// import DlDetail from '../DlDetails';
// import Users from '../User';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { userLogout } from '../../../../../../actions/authAction';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

const list = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }
];

export default function PermanentDrawerLeft(props) {
    const { setSelectMenu, selectMenu } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };

    const handelLogout = () => {
        dispatch(userLogout(navigate))
      }

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar sx={{ display: 'flex', position: 'sticky' }}>
                    <Typography variant="h6" noWrap component="div">
                        Driving Licence Detailes
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <div className='logout'>
                        <IconButton aria-label="logout" onClick={handelLogout}>
                            <ExitToAppIcon style={{ float: 'right', marginTop: '1rem' }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={Sarathi} alt='Sarathi' style={{ height: '9vh', width: '9vw', padding: '9px' }} />
                </Box>

                <List className={styles.container.css}>
                    {list.map(({ text, icon, path }) => (
                        <ListItem key={text}
                            disablePadding
                            selected={selectMenu === text}
                            onClick={() => {
                                setSelectMenu(text);
                                handleNavigate(path);
                            }}
                            className={`${styles.centeredListItem} ${selectMenu === text ? styles.selectedListItem : ""}`} >
                            <ListItemButton>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </div>
    );
}

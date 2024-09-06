// BasicAlerts.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './alert.css';

const BasicAlerts = () => {
    const dispatch = useDispatch();
    const apiAlert = useSelector(state => state.alert.apiAlert);

    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (apiAlert) {
            setExiting(false);
            const timeout = setTimeout(() => {
                setExiting(true);
                dispatch({
                    type: 'CLEAR_API_ALERT',
                });
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [apiAlert, dispatch]);

    return (
        <Stack className={`alertStack ${exiting ? 'exiting' : ''}`} sx={{ width: '20%' }} spacing={2}>
            {apiAlert && (
                <Alert className='alert' severity={apiAlert.severity}>
                    {apiAlert.message}
                </Alert>
            )}
        </Stack>
    );
};

export default BasicAlerts;
// AlertProvider.js
import React from 'react';
import BasicAlerts from './assets/alert';

const AlertProvider = ({ children }) => {
    return (
        <div>
            {children}
            <BasicAlerts />
        </div>
    );
};

export default AlertProvider;
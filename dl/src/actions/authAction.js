// import { useSelector } from 'react-redux';
import Api from '../config/index';

export const signUp = (userData, navigate) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`signup`, userData);

            if (fetchData?.data.status === 201) {
                // const { token, user } = fetchData?.data
                navigate('/login');
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message
                    }
                });
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'Signup Error'
                    }
                });
            }
        } catch (error) {
            console.error('Login Error', error);
            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'error',
                    message: 'Signup server error......'
                }
            });
        }
    }
}


export const userLogin = (userData, navigate) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`login`, userData);

            if (fetchData?.data.status === 200) {
                const { message, token, user } = fetchData?.data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('loginTimestamp', Date.now());

                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: message
                    }
                });


                dispatch({
                    type: 'ADD_USER_DETAIL',
                    payload: fetchData?.data.user
                });
                navigate('/');
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'login Error'
                    }
                });
            }
        } catch (error) {
            console.error('Login Error', error);
            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'error',
                    message: 'login Server Error......'
                }
            });
        }
    }
}


export const userLogout = (navigate) => {
    // const isAuthenticated = useSelector(state => state.auth.authUser);
    return async (dispatch) => {
        try {
            // Assuming you are sending a request to invalidate the token on the server
            // const fetchData = await Api.post(`logout`, userData); // Change 'logout' to your logout endpoint

            // if (isAuthenticated) {
            dispatch({
                type: 'REMOVE_USER_DETAIL'
            });
            navigate('/login');

            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'success',
                    message: 'Logout successful' // Change to your success message
                }
            });
            // } else {
            //     dispatch({
            //         type: 'ADD_API_ALERT',
            //         payload: {
            //             severity: 'error',
            //             message: 'Logout Error'
            //         }
            //     });
            // }
        } catch (error) {
            console.error('Logout Error', error);
            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'error',
                    message: 'Server Error. Please try again.' // Change to your server error message
                }
            });
        }
    };
};


export const DeleteDlUserMany = (dlObj) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`deleteDlUser`, dlObj);

            if (fetchData?.data?.status === 404) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: fetchData?.data.message,
                    },
                });
            } else if (fetchData?.data?.status === 200) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message,
                    },
                });
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'UserDlMany get Error',
                    },
                });
            }
        } catch (error) {
            console.error('Apply Error', error);
            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'error',
                    message: 'DL insert server error......',
                },
            });
            throw error;
        }
    };
};

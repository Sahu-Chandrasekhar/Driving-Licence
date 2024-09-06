import Api from '../config/index';

export const addDocuments = (userData) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`dl_user_insert`, userData);

            if (fetchData?.data.status === 201) {
                // const { token, user } = fetchData?.data
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message
                    }
                });
                dispatch(ReadDlUsers());
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
            console.error('Apply Error', error);
            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'error',
                    message: 'DL insert server error......'
                }
            });
        }
    }
}

export const ReadDlUsers = () => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.get(`dl_user_view`);
  
            if (fetchData?.data?.status === 201) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message,
                    },
                });
                dispatch({
                    type: 'ADD_DLUSER_DETAIL',
                    payload: fetchData?.data.data
                });
                return fetchData.data.data;
            } else if (fetchData?.data?.status === 200) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: fetchData?.data.message,
                    },
                });
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'Signup Error',
                    },
                });
            }

            // Return the fetched data
            // This assumes the data you need is directly under fetchData.data
        } catch (error) {
            console.error('Apply Error', error);
            dispatch({
                type: 'ADD_API_ALERT',
                payload: {
                    severity: 'error',
                    message: ' insert server error......',
                },
            });
            throw error; // Rethrow the error to handle it in the component
        }
    };
};

export const vewDlByUnderScoreId = () => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.get(`dl_user_view_By_UnderScoreId`);
  
            if (fetchData?.data?.status === 201) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message,
                    },
                });
                dispatch({
                    type: 'ADD_DLUSER_DETAIL',
                    payload: fetchData?.data.data
                });
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'Signup Error',
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


//userACtion.....
export const getAllUser = () => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.get(`viewAllUser`);
  
            if (fetchData?.data?.status === 201) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message,
                    },
                });
                return fetchData.data.data;
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'get Error',
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


export const getUserDetailes = () => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.get(`viewAllUser`);
    
            if (fetchData?.data?.status === 201) {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'success',
                        message: fetchData?.data.message,
                    },
                });
                return fetchData.data.data;
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'get Error',
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


export const dlUserDatas = (userObj) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`get_dl_by_user_id`, userObj);

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
                return fetchData.data.data;
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'dlUsersDatas get Error',
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



export const DlUpdateStuatus = (dlObj) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`update_dl_status`, dlObj);
     
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
                return fetchData.data.data;
            } else {
                dispatch({
                    type: 'ADD_API_ALERT',
                    payload: {
                        severity: 'error',
                        message: 'dlUsersDatas get Error',
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


export const DeleteDl = (dlObj) => {
    return async (dispatch) => {
        try {
            const fetchData = await Api.post(`delete_dl_data`, dlObj);
  
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
                        message: 'dlUsersDatas get Error',
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
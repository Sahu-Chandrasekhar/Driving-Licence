import { Button, Dialog, TextField } from '@mui/material';
import React from 'react'
// import styles from './style.module.css'

const EditModal = (props) => {
    const { dilogOpen, setDilogOpen } = props;
    const handleClose = () => {
        setDilogOpen(false);
    };
    return (
        <div>
            <Dialog onClose={handleClose} open={dilogOpen} className='dilog'>
                <form encType="multipart/form-data" className='dilog-container'>
                    <h1 className='heading'>Apply New Driving Licence</h1>

                    <TextField id='outlined-basic' label='Enter Adhaar Number' variant='outlined' name='Adhaar' />
                  {/*  {formErrors.Adhaar && <div className="error">{formErrors.Adhaar}</div>} */}

                    <TextField id='outlined-basic' label='Enter PAN Number' variant='outlined' name='Pan' />
                    {/*         {formErrors.Pan && <div className="error">{formErrors.Pan}</div>} */}

                    <select type='select' name="Dl" placeholder='select'>
                        <option value="">Select</option>
                        <option value="2 Wheeler">2 Wheeler</option>
                        <option value="3 Wheeler">3 Wheeler</option>
                        <option value="LMV">LMV</option>
                        <option value="2 Wheeler & lmv">2 Wheeler & LMV</option>
                        <option value="2 & 3 Wheeler">2 & 3 Wheeler</option>
                    </select>
                    <Button className='btn btn-sucess' variant="outlined">Submit</Button>
                </form>
            </Dialog>
        </div>
    )
}

export default EditModal

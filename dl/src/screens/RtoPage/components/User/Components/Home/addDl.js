import { Button, Dialog, TextField } from '@mui/material';
import React, { useState } from 'react';
import './adddl.css';
import { addDocuments } from '../../../../../../actions/dlAction';
import { useDispatch } from 'react-redux';


function AddDl(props) {
    const dispatch = useDispatch();
    const { formData, setFormData, dilogOpen, setDilogOpen, handleUserDl } = props;


    const handleClose = () => {
        setDilogOpen(false);
    };


    const [formErrors, setFormErrors] = useState({
        Adhaar: '',
        Pan: '',
        Dl: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(formData);
        dispatch(addDocuments(formData))
            .then(() => {
                handleUserDl();
            });
        if (Object.keys(errors).length === 0) {
            setDilogOpen(false);
        } else {
            setFormErrors(errors);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
    };

    const validate = (values) => {
        let errors = {};
        if (!values.Adhaar) {
            errors.Adhaar = "Adhaar Number is missing!*";
        }
        if (!values.Pan) {
            errors.Pan = "Pan number is Missing!*";
        }

        setFormErrors(errors);
        return errors;
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={dilogOpen} className='dilog'>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className='dilog-container'>
                    <h1 className='heading'>Apply New Driving Licence</h1>

                    <TextField id='outlined-basic' label='Enter Adhaar Number' variant='outlined' name='Adhaar' value={formData.Adhaar} onChange={handleInputChange} />
                    {formErrors.Adhaar && <div className="error">{formErrors.Adhaar}</div>}

                    <TextField id='outlined-basic' label='Enter PAN Number' variant='outlined' name='Pan' value={formData.Pan} onChange={handleInputChange} />
                    {formErrors.Pan && <div className="error">{formErrors.Pan}</div>}

                    <select type='select' name="Dl" placeholder='select' value={formData.Dl} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="2 Wheeler">2 Wheeler</option>
                        <option value="3 Wheeler">3 Wheeler</option>
                        <option value="LMV">LMV</option>
                        <option value="2 Wheeler & lmv">2 Wheeler & LMV</option>
                        <option value="2 & 3 Wheeler">2 & 3 Wheeler</option>
                    </select>
                    <Button className='btn btn-sucess' variant="outlined" type="submit">Submit</Button>
                </form>
            </Dialog>
        </div>
    );
}

export default AddDl;






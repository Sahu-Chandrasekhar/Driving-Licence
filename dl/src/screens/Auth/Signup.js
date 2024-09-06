import React, { useState } from 'react';
import './signup.css';
import { Grid, Link } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/authAction';

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        authType: 'User',
        name: '',
        email: '',
        phone: '',
        gender: '',
        password: ''
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((formData) => ({ ...formData, [name]: value }));
    };

    const handleSubmit = () => {
        dispatch(signUp(userData, navigate));
    }

    return (
        <Grid className='container'>
            <form className='form'>
                <h2>Registration Form</h2>
                <Grid className="input-group">
                    <label>Name:</label>
                    <input type="text" placeholder='Enter Name' id="username" name="name" onChange={handleInputChange} required />
                </Grid>
                <Grid className="input-group">
                    <label>Number:</label>
                    <input type="number" placeholder='Enter valid Number' id="address" name="phone" onChange={handleInputChange} required />
                </Grid>
                <Grid className="input-group">
                    <label>Password:</label>
                    <input type="password" placeholder='Enter Valid Password' id="password" name="password" onChange={handleInputChange} required />
                </Grid>
                <Grid className="input-group">
                    <label >Email:</label>
                    <input type="email" placeholder='Enter valid Email' id="email" name="email" onChange={handleInputChange} required />
                </Grid>

                <label>Gender:</label><br />
                <Grid className='grnderGroup'>
                    <Grid className='Genders'>
                        <label>Male</label>
                        <input type="radio" id="male" name="gender" value="male" onChange={handleInputChange} required />
                    </Grid>
                    <Grid className='Genders'>
                        <label>Female</label>
                        <input type="radio" id="female" name="gender" value="female" onChange={handleInputChange} required />
                    </Grid>
                    <Grid className='Genders'>
                        <label>Other</label>
                        <input type="radio" id="other" name="gender" value="other" onChange={handleInputChange} required />
                    </Grid>
                </Grid>

                <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid>
                        <label style={{ color: ' black', padding: '10px', float: 'left', fontSize: 'smaller' }}>This Id is already exist <Link href='/login' style={{ textDecoration: 'none' }}>Login</Link></label>
                    </Grid>
                    <Grid>
                        <Button className='btn' variant="contained" color="success" onClick={handleSubmit}>Signup</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default Signup;


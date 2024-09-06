import React, { useState } from 'react';
import './login.css';
import { Grid, Link } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../actions/authAction'



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(userLogin(userData, navigate));
  }



  return (
    <Grid>
      <Grid className='EnterScreen'>
        <Grid className='secondbackground'>
          <Grid className='loginForm'>
            <form>
              <Grid>
                <h2>Sarathi Paribahan</h2>
              </Grid>
              <Grid className='formGroup'>
                <label for="email">EmailId:</label>
                <input type="text" placeholder='Enter valid userId' id="address" name="email" onChange={handleInputChange} required />
              </Grid>
              <Grid className='formGroupPassword'>
                <label for="password">Password:</label>
                <input type="password" placeholder='Enter Valid Password' id="password" name="password" onChange={handleInputChange} required />
              </Grid>
              <Grid className='formGroupPassword' style={{ display: 'flex' }}>

                <label for="terms" style={{ color: ' black', padding: '10px', fontSize: 'smaller' }}>Don't have an account <Link href='/signup' style={{ textDecoration: 'none' }}>Signup</Link></label>
              </Grid>
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login;

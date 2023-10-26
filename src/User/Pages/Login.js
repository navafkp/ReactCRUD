import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercss.css';
import {useDispatch, useSelector} from 'react-redux'
import { LOGIN } from '../../Redux/ActionType'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    console.log(token)
    useEffect(()=>{
        if (token){
            console.log(token)
            navigate('/home')
        }else{
            navigate('/')
        }
    },[token,navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError(null)
       
            await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,password
                })
            } ).then(async (res)=>{
                const data =  await res.json();
               
                console.log(data)
              
                console.log(data.error)
                if(data.error === 'Incorrrect Password'){
                    
                    setError('Incorrrect Password')
                    
                }else if(data.error === 'User is not found'){
                    
                    setError('Incorrrect email')
                }else if(data.error === 'Email and Password is required'){
                    
                    setError('Email and Password is required')
                }
                else{
                    dispatch({
                        type:LOGIN,
                        token: data,
    
                    })
                    // Navigate to the desired location
                    navigate('/home');
                }
                
            })


        }




           
           
            
    return (
        <>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                {error && <div className='error'>{error}
                    </div>}
                <div className='registerBtn'>
                    <span>Not a Member?</span>  <Link to='/register'>Signup</Link>
                </div>
            </div>
        </>
    );
};

export default Login;
import React, { useEffect, useState } from 'react'
import {Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner.js';

const Login = ()=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    //Form Submit
    const submitHandler = async(values)=>{
        try{
            setLoading(true)
            const {data} = await axios.post('/users/login', values)
            setLoading(false)
            message.success('login success')
            localStorage.setItem('user', JSON.stringify({...data.user, password:''}))
            navigate('/')
        }catch(error){
            setLoading(false)
            message.error('somthing went wrong');
        }
    };

    //Prevent for login user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    }, [navigate])

    return(
        <>
            <div className='login-page'>
                {loading && <Spinner /> }
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Login Page</h1>
                    <Form.Item label='Email' name='email'>
                        <Input type='email'/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to='/register'> Not a user ? Click here to Register </Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login
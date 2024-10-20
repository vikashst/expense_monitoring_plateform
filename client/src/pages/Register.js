import React, {useState,useEffect } from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner.js'

const Register = ()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    //Form Submit
    const submitHandler = async(values)=>{   //Here we are sending form data to server.
        try{
            setLoading(true)
            await axios.post('/users/register', values)
            message.success('registration successful')
            setLoading(false)
            navigate('/login')
        }catch(error){
            setLoading(false)
            message.error('somthing went wrong')
        }
    }

    //Prevent for register user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    }, [navigate])

    return(
        <>
            <div className='login-page'>
                {loading && <Spinner />}
                <Form layout='vertical' onFinish={submitHandler}>       {/* Because we are using "Ant Design" here, so we are using "onFinish" instead of "onSubmit" event handler. */}
                    <h1 >Registration Page</h1>
                    <Form.Item label='Name' name='name'>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Email' name='email'>
                        <Input type='email'/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input type='password'/>
                    </Form.Item>

                    <div className='d-flex justify-content-between'>
                        <Link to='/login' >Already Register ? Click here to to login </Link>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default Register
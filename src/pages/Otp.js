import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
// import useNomineecontext from '../hooks/useNomineecontext';
import useAuthcontext from '../hooks/useAuthContext';

const Otp = () => {
    const [otp,setOtp] = useState()
    const [error,setError] = useState()
    // const {user} = useNomineecontext()
    const {dispatch} = useAuthcontext()
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault()
    
        setError(null)
        const email  = JSON.parse(localStorage.getItem('Yalemail'))
        const password  = JSON.parse(localStorage.getItem('Yalepass'))
        const register = {email,password,otp}
        
        const response = await fetch('https://yalebackend.onrender.com/api/register/', {
            method: 'POST',
            body: JSON.stringify(register),
            headers: { 'Content-Type': 'application/json' }
        })


        const json = await response.json()

        if(response.ok){
            localStorage.setItem('YaleID',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload : json})
            navigate('/')
        }
        if(!response.ok){
            setError(json)
        }
        
    }
    return (
        <div className="">
            <center className='otp'>
                <p className="lead fw-bold">Verify</p>
                <Form onSubmit={handleSubmit}> 
                    <Form.Control
                        placeholder="enter otp sent to email"
                        className='w-25 mb-3'
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button as="input" type = 'submit' variant="secondary" value='submit' className='w-25 d-block' />
                </Form>
                
                {error && <div className='error w-25'>{error}</div>}
            </center>

        </div>);
}

export default Otp;
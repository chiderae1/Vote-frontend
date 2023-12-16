import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import useNomineecontext from "../hooks/useNomineecontext";
import useAuthcontext from "../hooks/useAuthContext";

const Signup = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate();
    const {dispatch} = useNomineecontext()
    const [showPassword, setShowPassword] = useState(false)
    // const {dispatch} = useAuthcontext()

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const register = { email, password }
        const response = await fetch('https://yalebackend.onrender.com/api/create/', {
            method: 'POST',
            body: JSON.stringify(register),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()
        if (response.ok) {
            console.log(true)
            navigate('/signup/otp')
            dispatch({type : 'USERDETAILS', payload:{ email: email, password : password}})
            localStorage.setItem('Yalemail',JSON.stringify(email))
            localStorage.setItem('Yalepass',JSON.stringify(password))
        }
        if (!response.ok) {
            setError(json.error)
        }
    }

    
    return (

        <div className="login-page">
            <center>
                <p className="lead fw-bold">Signup</p>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3 w-25">
                        <InputGroup.Text id="basic-addon1">
                            <span className='material-symbols-outlined'>email</span>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3 w-25">
                        <InputGroup.Text id="basic-addon1">
                            <span className='material-symbols-outlined'>lock</span>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="password"
                            aria-label="password"
                            aria-describedby="basic-addon1"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <InputGroup.Checkbox checked={showPassword}
                            onChange={togglePassword}
                        />
                    </InputGroup>

                    <Button as="input" type="submit" variant="secondary" value="Signup" className='w-25' />
                </Form>
                {/* {ferror && <div className="error w-25">{ferror}</div>} */}
                {error && <div className="error w-25">{error}</div>}

                <p className="small p-2">have an account? <Link className="text-secondary" to={'/login'}>login</Link></p>
            </center>
        </div>
    );
}

export default Signup;
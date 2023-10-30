import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate();
    // const {dispatch} = useNomineecontext()
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setError(null)
        const register = {email, password}
        const response = await fetch('http://localhost:8000/api/login/',{
            method: 'POST',
            body: JSON.stringify(register),
            headers: {'Content-Type' : 'application/json'}
        })

        const json = await response.json()

        if(response.ok){
            localStorage.setItem('YaleID',JSON.stringify(json))
            localStorage.setItem('Yalemail',JSON.stringify(email))
            navigate('/')
        }
        if(!response.ok){
            setError(json.error)
        }
    }
    return (

        <div className="login-page">
            <center>
                <p className="lead fw-bold">LOGIN</p>
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

                    <Button as="input" type="submit" variant="secondary" value="LOGIN" className='w-25' />
                </Form>
                {/* {ferror && <div className="error w-25">{ferror}</div>} */}
                {error && <div className="error w-25">{error}</div>}
                <p className="small p-2">Don't have an account? <Link className="text-secondary" to={'/signup'}>signup</Link></p>
                
            </center>
        </div>
    );
}

export default Login;
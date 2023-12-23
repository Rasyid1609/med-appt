import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css";
import { API_URL } from '../../config';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/")
        }
    }, []);

    const login = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // name: name,
                email: email,
                password: password,
            }),
        });

        const json = await res.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);

            sessionStorage.setItem('email', email);

            navigate('/');
            window.location.reload()
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    alert(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };
  return (
    <div className='bodyy'>
        <div className="container" style={{ marginTop: "10%" }}>
            <div className="login-grid">
                <div className="login-text">
                    <h1>Login</h1>
                </div>
                <div className="login-text">
                    Are you a new member?{" "}
                    <span>
                        <a href="/Sign_Up" style={{ color: "#2190FF" }}>
                        {" "}
                        Sign Up Here
                        </a>
                    </span>
                    </div>
                    <br />
                    <div className="login-form">
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    aria-describedby="helpId" />
                            </div>

                            <div className="btn-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                                >
                                    Login
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-danger mb-2 waves-effect waves-light"
                                >
                                    Reset
                                </button>
                            </div>
                            <br />
                            <div className="login-text">Forgot Password?</div>
                        </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login;
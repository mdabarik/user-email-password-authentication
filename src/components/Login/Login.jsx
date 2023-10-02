import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset error and success
        setRegisterError("");
        setSuccess("");

        // add validation

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccess("User logged in succesfully.");
                } else {
                    alert("Please veryfy your email")
                }
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log("Send reset email", email);
            return;
        }
        // else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ /.test(email)) {
            // console.log("Please write a valid email");
            // return;
        // }

        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('please check your email');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    ref={emailRef}
                                    type="email" 
                                    name='email' 
                                    placeholder="email" 
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Register" />
                            </div>
                        </form>

                        {
                            registerError && <p className="text-red-800 text-2xl text-center">{registerError}</p>
                        }

                        {
                            success && <p className="text-green-600 text-center">{success}</p>
                        }

                        <p>New to this website Please  
                            <Link to="/register">Register</Link>
                        </p>
                </div>
            </div>
        </div>
        </div >
    );
};

export default Login;
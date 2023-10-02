import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [creating, setCreating] = useState(false);

    const handleRegister = (e) => {
        setCreating(true)
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        console.log(name);
        // reset error
        setRegisterError("");
        setSuccess("");

        if (password.length < 6) {
            setRegisterError("Password must be at least 6 characters long.");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("You password should have at least one uppercase character");
            return;
        } else if (!accepted) {
            setRegisterError("please accept our terms and conditions.");
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                setCreating(false)
                setSuccess("User Created Succesfully.")
                updateProfile(res.user, {
                    displayName: name,
                    photoURL: ""
                })
                    .then(() => {
                        console.log('updated');
                    })
                    .catch(err => {

                    })

                sendEmailVerification(res.user)
                    .then(() => {
                        alert("Verify your account")
                    })
                    .catch(err => {
                        console.log(err.message);
                    })

            })
            .catch(error => {
                setCreating(false)
                setRegisterError(error.message)
            })

    }

    return (
        <div className='w-[60%] mx-auto'>
            <h2>Please Register</h2>
            {
                creating ? <h3>Creating User....</h3> : ""
            }
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="Type your name..." className='rounded-lg mb-3 mt-4 static p-3 w-full border-2' />
                <input className='mb-4 p-3 rounded-lg w-full border-2' placeholder='Type email...' type="email" name="email" required /> <br />
                <div className="relative">
                    <input className='rounded-lg static p-3 w-full border-2'
                        placeholder='Type password...'
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required />
                    <span className="absolute right-0 top-5" onClick={() => setShowPassword(!showPassword)}>{
                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }</span>
                </div>
                <br />
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2 mb-2" htmlFor="terms">Accept Terms and Conditions.</label>
                <br />
                <input className='mb-4 w-full btn btn-secondary' type="submit" value="Register" />
            </form>

            {
                registerError && <p className="text-red-800 text-2xl text-center">{registerError}</p>
            }

            {
                success && <p className="text-green-600 text-center">{success}</p>
            }

            <p>New to this website Please
                <Link to="/login"> Go to login page</Link>
            </p>

        </div>
    );
};

export default Register;
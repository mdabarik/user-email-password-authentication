import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');

    const [creating, setCreating] = useState(false);

    const handleRegister = (e) => {
        setCreating(true)
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        // reset error
        setRegisterError("");
        setSuccess("");

        if (password.length < 6) {
            setRegisterError("Password must be at least 6 characters long.");
            return;
        }

        
        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            const user = res.user;
            setCreating(false)
            setSuccess("User Created Succesfully.")
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
                <input className='mb-4 w-full border-2' placeholder='Type email...' type="email" name="email" required /> <br />
                <input className='mb-4 w-full border-2' placeholder='Type password...' type="password" name="password" required /> <br />
                <input className='mb-4 w-full btn btn-secondary' type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-800 text-2xl text-center">{registerError}</p>
            }
            {
                success && <p className="text-green-600 text-center">{success}</p>
            }
        </div>
    );
};

export default Register;
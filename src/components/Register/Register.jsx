import React from 'react';

const Register = () => {

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
    }

    return (
        <div className='w-[60%] mx-auto'>
            <h2>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className='mb-4 w-full border-2' placeholder='Type email...' type="email" name="email"/> <br />
                <input className='mb-4 w-full border-2' placeholder='Type password...' type="password" name="password" /> <br />
                <input className='mb-4 w-full btn btn-secondary' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;
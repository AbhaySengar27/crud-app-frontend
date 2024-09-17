import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/users', {
            name: name,
            email: email,
            age: age
        })
        .then(response => {
            setName('');
            setEmail('');
            setAge('');
            window.location.reload();  // Reload to fetch updated user list
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Add User</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;

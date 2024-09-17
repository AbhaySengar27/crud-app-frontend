import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); // Tracks the user currently being edited
    const [editUserData, setEditUserData] = useState({ id: '', name: '', email: '', age: '' }); // Tracks the editable fields

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('https://crud-app-backend-9rgr.onrender.com/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteUser = (id) => {
        axios.delete(`https://crud-app-backend-9rgr.onrender.com/api/users/${id}`)
            .then(() => {
                fetchUsers();  // Refresh the list after deletion
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Handles the click of the Edit button for inline editing
    const handleEditClick = (user) => {
        setEditingUserId(user.id);  // Set the editing state for the current user
        setEditUserData(user);  // Pre-fill the data in the editable fields
    };

    // Handles the input change when editing inline
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData({ ...editUserData, [name]: value });
    };

    // Handles the Save button click to save the updated user details
    const handleSaveClick = (id) => {
        axios.put(`https://crud-app-backend-9rgr.onrender.com/api/users/${id}`, editUserData)
            .then(() => {
                setEditingUserId(null);  // Exit editing mode after saving
                fetchUsers();  // Refresh the user list
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>User List</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={editUserData.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={editUserData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        value={editUserData.age}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.age
                                )}
                            </td>
                            <td>
                                {editingUserId === user.id ? (
                                    <>
                                        <button
                                            className="btn btn-sm btn-success me-2"
                                            onClick={() => handleSaveClick(user.id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => setEditingUserId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;

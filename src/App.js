import React from 'react';
import AddUser from './AddUser';
import UserList from './UserList';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap

function App() {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">CRUD App</h1>
            <div className="card mt-4 p-4 shadow-sm">
                <AddUser />
            </div>
            <div className="card mt-4 p-4 shadow-sm">
                <UserList />
            </div>
        </div>
    );
}

export default App;

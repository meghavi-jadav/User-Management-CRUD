import React, { useEffect, useState } from "react";

const UserTable = ({ setEditingUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/users?flag=true")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const handleSoftDelete = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flag: false }),
        })
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div>
            <h2>User List</h2>
            <button onClick={() => setEditingUser({})}>Add User</button>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => setEditingUser(user)}>Edit</button>
                                <button onClick={() => handleSoftDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;



import React, { useState, useEffect } from "react";

const UserForm = ({ editingUser, setEditingUser }) => {
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        if (editingUser && editingUser.id) {
            setFormData({ name: editingUser.name, email: editingUser.email });
        } else {
            setFormData({ name: "", email: "" });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: editingUser.id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, flag: true })
        };

        try {
            if (editingUser.id) {
                await fetch(`http://localhost:5000/users/${editingUser.id}`, requestOptions);
            } else {
                await fetch("http://localhost:5000/users", requestOptions);
            }
            setEditingUser(null);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>{editingUser.id ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" required />

                <input type="email" name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" required />

                <button type="submit">{editingUser.id ? "Update" : "Add"}</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
            </form>
        </div>
    );
};

export default UserForm;

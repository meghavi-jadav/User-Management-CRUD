import React, { useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

function App() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div>
      <h1>User Management</h1>
      {editingUser !== null ? (
        <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />
      ) : (
        <UserTable setEditingUser={setEditingUser} />
      )}
    </div>
  );
}

export default App;


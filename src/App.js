import React, { useState, useEffect, useContext } from "react";
import { UserContext, UserProvider } from "./context/UserContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";

function Dashboard() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h1>React Hooks Lab 7</h1>

      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>

      <hr />

      <h2>User Authentication</h2>

      <button onClick={() => setLoggedIn(!loggedIn)}>
        {loggedIn ? "Logout" : "Login"}
      </button>

      {loggedIn && users.length > 0 && (
        <div>
          <h3>Welcome, {users[0].name}!</h3>
          <p>Email: {users[0].email}</p>
        </div>
      )}

      <h2>Fetched Users</h2>
      <ul>
        {users.slice(0, 5).map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </ThemeProvider>
  );
}

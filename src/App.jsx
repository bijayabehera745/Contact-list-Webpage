import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ContactCard from './ContactCard'; // <-- We'll use the component
import './App.css';

// Your live Render API URL
const API_URL = 'https://contact-app-oa5s.onrender.com/api/contacts/';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // --- NEW AUTH STATE ---
  // Try to get the token from browser storage
  const [token, setToken] = useState(localStorage.getItem('apiToken') || '');
  // State for the login input box
  const [tokenInput, setTokenInput] = useState('');

  // --- NEW FORM STATE ---
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // 1. Function to fetch contacts
  const fetchContacts = () => {
    setError(null);
    axios.get(API_URL)
      .then(res => setContacts(res.data))
      .catch(err => {
        console.error("Error fetching contacts:", err);
        setError('Could not fetch contacts.');
      });
  };

  // 2. Fetch contacts on initial load
  useEffect(() => {
    fetchContacts();
  }, []);

  // 3. Filter contacts based on search
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  // --- 4. NEW: Handle Login ---
  const handleLogin = (e) => {
    e.preventDefault();
    setToken(tokenInput);
    localStorage.setItem('apiToken', tokenInput); // Save token to browser
  };

  // --- 5. NEW: Handle Logout ---
  const handleLogout = () => {
    setToken('');
    setTokenInput('');
    localStorage.removeItem('apiToken'); // Remove token
  };

  // --- 6. UPDATED: Handle Add Contact ---
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newContact = { name: newName, email: newEmail, phone: newPhone };

    axios.post(API_URL, newContact, {
      // We must send the token in the headers to prove we are logged in
      headers: { 'Authorization': `Token ${token}` }
    })
    .then(res => {
      setNewName('');
      setNewEmail('');
      setNewPhone('');
      fetchContacts(); // Refresh list
    })
    .catch(err => {
      console.error("Error adding contact:", err);
      setError('Failed to add contact. Is your token correct?');
    });
  };

  // --- 7. NEW: Handle Delete Contact ---
  const handleDelete = (idToDelete) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    axios.delete(`${API_URL}${idToDelete}/`, {
      // We also need the token to delete
      headers: { 'Authorization': `Token ${token}` }
    })
    .then(() => {
      fetchContacts(); // Refresh list
    })
    .catch(err => {
      console.error("Error deleting contact:", err);
      setError('Failed to delete contact. Is your token correct?');
    });
  };

  return (
    <div className="app">
      <h1>My Contact List</h1>

      {/* --- NEW: LOGIN/LOGOUT UI --- */}
      {token ? (
        <div className="login-box">
          <p>You are logged in.</p>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-box">
          <p>Paste your API Token to Add/Delete:</p>
          <input
            type="password"
            placeholder="Your API Token..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      )}

      {/* --- ADD CONTACT FORM (Only shows if logged in) --- */}
      {token && (
        <form onSubmit={handleAddSubmit} className="contact-form">
          <h3>Add New Contact</h3>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone (Optional)"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <button type="submit">Add Contact</button>
        </form>
      )}

      <hr />

      {/* --- SEARCH BAR --- */}
      <div className="search-container">
        <input
          type="search"
          placeholder="Search by name or email..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- CONTACT LIST --- */}
      <div className="contact-list">
        {error && <p className="error-message">{error}</p>}
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isLoggedIn={!!token} // Pass login status
              onDelete={handleDelete} // Pass delete function
            />
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
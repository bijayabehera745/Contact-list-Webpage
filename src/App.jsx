import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure you have this file

function App() {
  const [contacts, setContacts] = useState([]);

  // API URL for local development
  // OLD:
  // const API_URL = 'http://127.0.0.1:8000/api/contacts/';

  // NEW:
  const API_URL = '/api/contacts/';

  useEffect(() => {
    // Function to fetch contacts
    const fetchContacts = () => {
      axios.get(API_URL)
        .then(res => {
          setContacts(res.data);
        })
        .catch(err => {
          console.error("Error fetching contacts:", err);
        });
    };

    fetchContacts();
  }, []); // The empty array [] means this runs only once

  return (
    <div className="app">
      <h1>My Contact List</h1>
      <div className="contact-list">
        {contacts.length > 0 ? (
          contacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <h3>{contact.name}</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </div>
          ))
        ) : (
          <p>No contacts found. (Is your backend server running?)</p>
        )}
      </div>
    </div>
  );
}

export default App;
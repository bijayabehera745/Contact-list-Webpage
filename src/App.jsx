import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  
  // This URL MUST point to your live Render backend
  const API_URL = 'https://contact-app-oa5s.onrender.com/api/contacts/';

  useEffect(() => {
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
  }, []);

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

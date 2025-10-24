import React from "react";

// We now pass the whole contact object, login status, and delete function
const ContactCard = ({ contact, isLoggedIn, onDelete }) => {
  return (
    <div className="contact-card">
      {/* NEW: Show delete button only if logged in */}
      {isLoggedIn && (
        <button
          className="delete-button"
          onClick={() => onDelete(contact.id)}
        >
          &times;
        </button>
      )}
      <h3>{contact.name}</h3>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
    </div>
  );
};

export default ContactCard;
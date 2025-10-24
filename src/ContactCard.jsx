import React from "react";

const ContactCard = ({name, email, phone}) => {
    return(
        <div className="contact-card">
            <h3>{name}</h3>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
        </div>
    );
};

export default ContactCard;
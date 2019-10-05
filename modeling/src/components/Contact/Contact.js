import React from "react";
import "./Contact.css";
const Contact = () => {
  fetch(
    "https://api.instagram.com/v1/users/natus_vincere_official/media/recent"
  )
    .then(_ => _.json())
    .then(data => console.log(data));
  return <div className="contact">Contact</div>;
};

export default Contact;

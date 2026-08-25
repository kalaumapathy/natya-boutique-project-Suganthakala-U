import React from "react";

function Contact() {
  return (
    <section className="page contact">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Message
          <textarea placeholder="Tell us what you need" />
        </label>
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>
    </section>
  );
}

export default Contact;

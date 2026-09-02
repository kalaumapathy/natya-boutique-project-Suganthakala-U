import { useState } from "react";
import Button from "../components/Button";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = "Enter your name using at least 2 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setFormData(INITIAL_FORM);
    }
  };

  return (
    <section className="page contact">
      <div className="content-card contact-card">
        <h1>Contact Us</h1>
        <p>
          Have a question about a costume, accessory, or order? Send us a
          message and we will be happy to help.
        </p>

        {submitted && (
          <p className="status-message" role="status">
            Thank you! Your message has been received.
          </p>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="contact-name">
            Name
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
          </label>
          {errors.name && (
            <span id="contact-name-error" className="field-error">
              {errors.name}
            </span>
          )}

          <label htmlFor="contact-email">
            Email
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
            />
          </label>
          {errors.email && (
            <span id="contact-email-error" className="field-error">
              {errors.email}
            </span>
          )}

          <label htmlFor="contact-message">
            Message
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you need"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
            />
          </label>
          {errors.message && (
            <span id="contact-message-error" className="field-error">
              {errors.message}
            </span>
          )}

          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

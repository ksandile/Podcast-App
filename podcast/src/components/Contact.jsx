import React from 'react';
import './Contact.css'; // Import your CSS file for styling

/**
 * Contact component renders a contact form with fields for name, email, and message.
 * Users can submit inquiries or messages through this form.
 */
const Contact = () => {
  return (
    <div className="contact"> {/* Container div with contact class for styling */}
      <h2>Contact Us</h2> {/* Heading for the contact section */}
      <p>
        If you have any questions or inquiries, please feel free to reach out to us.
      </p> {/* Informational paragraph */}
      <form> {/* Form element to collect user input */}
        <label htmlFor="name">Name:</label> {/* Label for name input */}
        <input type="text" id="name" name="name" placeholder="Your name" required /> {/* Name input field */}

        <label htmlFor="email">Email:</label> {/* Label for email input */}
        <input type="email" id="email" name="email" placeholder="Your email" required /> {/* Email input field */}

        <label htmlFor="message">Message:</label> {/* Label for message textarea */}
        <textarea id="message" name="message" rows="4" placeholder="Your message" required></textarea> {/* Message textarea */}

        <button type="submit">Submit</button> {/* Submit button for form submission */}
      </form>
    </div>
  );
};

export default Contact; // Export Contact component as default

import React from 'react';
import './About.css'; // Import CSS file for styling

/**
 * About component displays information about the application or organization.
 * It provides a brief overview and description.
 */
const About = () => {
  return (
    <div className="about"> {/* Container div with 'about' class for styling */}
      <h2>About Us</h2> {/* Heading */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. {/* Placeholder text */}
        Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies
        vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget
        quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Donec sed odio dui. Donec ullamcorper nulla non
        metus auctor fringilla.
      </p>
      <p>
        Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
        Nulla vitae elit libero, a pharetra augue. Sed posuere consectetur est at lobortis.
        Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla
        sed consectetur.
      </p>
    </div>
  );
};

export default About;

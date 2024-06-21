import React from 'react';

/**
 * Footer component renders the footer content for the application.
 */
const Footer = () => {
  return (
    <footer className="footer"> {/* Footer container with footer class */}
      <div className="footer-content"> {/* Footer content container with footer-content class */}
        <p>&copy; 2024 SANKIT.Com Podcast. All rights reserved.</p> {/* Copyright notice */}
      </div>
    </footer>
  );
};

export default Footer; // Export Footer component as default

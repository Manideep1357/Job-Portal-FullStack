import React from 'react';
// Icons library use chesthe code chala clean ga untundi
import { Github, Instagram, Linkedin } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-[#7209b7]">Job Hunt</h2>
            {/* Year ni 2026 ki update chesanu */}
            <p className="text-sm text-gray-600">© 2026 Damarla Manideep. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* GitHub - Professional Code Showcase */}
            <a 
                href="https://github.com/Manideep1357" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-black transition-all duration-300"
                aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>

            {/* Instagram - Personal/Social Presence */}
            <a 
                href="https://www.instagram.com/manideep.93?igsh=eTl2ZHU1cWcwYm1o" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#E4405F] transition-all duration-300"
                aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>

            {/* LinkedIn - Career Profile (Most Important) */}
            <a 
                href="https://www.linkedin.com/in/damarla-manideep-8a1117238" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#0A66C2] transition-all duration-300"
                aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
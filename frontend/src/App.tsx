import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import type { FooterSection, FooterLink } from './components/Footer/Footer.types';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Footer from './components/Footer/Footer';
import Example from './pages/Example/Example';
import Login from './pages/Login/Login'
import Kontoransatt from './pages/Kontoransatt/Kontoransatt'
import Laerer from './pages/Lærer/Laerer'

const sections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Enterprise", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const bottomLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];



const socialLinks: FooterLink[] = [
  { label: "Facebook", href: "https://facebook.com", icon: <FaFacebook /> },
  { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin /> },
];

// const featuredLinks: FooterLink[] = [
//   { label: "Get Support", href: "/support", icon: <FaLifeRing /> },
//   { label: "API Docs", href: "/docs", icon: <FaBook /> },
//   { label: "Status Page", href: "/status", icon: <FaFileAlt /> },
//   { label: "Download App", href: "/download", icon: <FaDownload /> },
// ];

function App() {
  return (
    <>
      <div className="viewport">
        <Router>
          {/* <Navbar /> */}
          <Routes>
           
            <Route path="/Example" element={<Example />} />
            <Route path="/" element={<Login />} />
            <Route path="/kontoransatt" element={<Kontoransatt />} />
            <Route path="/Laerer" element={<Laerer />} />
          </Routes>
        </Router>
      </div>
      
      {/* <Footer

        sections={sections}
        socialLinks={socialLinks}
        bottomText="© 2024 Acme Corporation. All rights reserved."
        bottomLinks={bottomLinks}
        style={{ background: "#18181b", color: "#fff" }}
      /> */}
    </>
  );
}

export default App;

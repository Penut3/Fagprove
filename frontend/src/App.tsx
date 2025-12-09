import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';

import type { FooterSection, FooterLink } from './components/Footer/Footer.types';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Footer from './components/Footer/Footer';
import Example from './pages/Example/Example';

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Example" element={<Example />} />

          </Routes>
        </Router>
      </div>
      
      <Footer
        // logo={<img src="/logo.svg" alt="Company Logo" className="h-10 w-auto" />}
        // companyName="Acme Corporation"
        // badge={{ text: "Trusted by 1000+ companies", variant: "secondary" }}
        // description="We're building the next generation of business tools to help companies scale efficiently and effectively."
        // companyInfo={{
        //   address: "123 Business St, Suite 100\nSan Francisco, CA 94105",
        //   phone: "+1 (555) 123-4567",
        //   email: "hello@acme.com",
        // }}
        // featuredLinks={featuredLinks}
        sections={sections}
        socialLinks={socialLinks}
        bottomText="© 2024 Acme Corporation. All rights reserved."
        bottomLinks={bottomLinks}
        style={{ background: "#18181b", color: "#fff" }}
      />
    </>
  );
}

export default App;

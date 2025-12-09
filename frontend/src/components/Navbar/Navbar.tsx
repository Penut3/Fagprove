import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import s from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // ← Tell TS this will be a DIV (or null)
  const menuRef = useRef<HTMLDivElement>(null);

   const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/example', label: 'Example' },
    // Add more links here
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // event.target is just EventTarget, so cast it to Node
      const targetNode = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(targetNode)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={s.navbar}>
      <div className={s.burger} onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? <CloseIcon sx={{ fontSize: '2rem' }}/> : <MenuIcon sx={{ fontSize: '2rem' }} />}
      </div>
      <div
        ref={menuRef}
        className={`${s.linkContainer} ${isOpen ? s.showMenu : ''}`}
      >
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={s.navbarLink}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

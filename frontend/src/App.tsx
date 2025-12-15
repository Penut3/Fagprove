import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import type { FooterSection, FooterLink } from './components/Footer/Footer.types';
// import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login'
import AllParticipants from './pages/Kontoransatt/AllParticpants'
import Laerer from './pages/Lærer/Laerer'
import Registrer from './pages/Kontoransatt/Registrer';
import AllUsersPage from './pages/Kontoransatt/AllUsersPage';
import LaererLayout from "./layouts/LaererLayout"
import KontorLayout from "./layouts/KontorLayout"
import CourseHours from './pages/Lærer/CourseHours';
import Attendance from './pages/Lærer/Attendance';
import MissingAttendance from './pages/Lærer/MissingAttendance';
import CreateAttendance from './pages/Lærer/CreateAttendance';
import TermsAndConditions from './pages/Personvern/TermsAndConditions';
import ParticipantCourses from './pages/Kontoransatt/ParticipantCourses';
import PrivacyPolicy from './pages/Personvern/PrivacyPolicy';

// const sections: FooterSection[] = [
//   {
//     title: "Product",
//     links: [
//       { label: "Features", href: "#" },
//       { label: "Pricing", href: "#" },
//       { label: "Enterprise", href: "#" },
//     ],
//   },
//   {
//     title: "Resources",
//     links: [
//       { label: "Blog", href: "#" },
//       { label: "Help Center", href: "#" },
//       { label: "Community", href: "#" },
//     ],
//   },
//   {
//     title: "Company",
//     links: [
//       { label: "About", href: "/about" },
//       { label: "Careers", href: "/careers" },
//     ],
//   },
// ];

// const bottomLinks: FooterLink[] = [
//   { label: "Privacy Policy", href: "/privacy" },
//   { label: "Terms of Service", href: "/terms" },
//   { label: "Cookie Policy", href: "/cookies" },
// ];



function App() {
  return (
    <>
      <div className="viewport">
        <Router>
          {/* <Navbar /> */}
          <Routes>
           
           
            <Route path="/" element={<Login />} />
            <Route path="/vilkar-og-betingelser" element={<TermsAndConditions />} />
            <Route path="/personvernserklering" element={<PrivacyPolicy />} />

            <Route element={<KontorLayout />}>
              <Route path="/kontor/participants" element={<AllParticipants />} />
              <Route path="/kontor/registrer" element={<Registrer />} />
              <Route path="/kontor/users" element={<AllUsersPage />} />
              <Route path="/kontor/participants/participant-courses/:participantId" element={<ParticipantCourses />} />
            </Route>

            <Route element={<LaererLayout />}>
              <Route path="/laerer" element={<Laerer />} />
              <Route path="/laerer/:courseId" element={<CourseHours />} />
              <Route path="/laerer/attendances/:courseId/:courseHourId" element={<Attendance />} />
              <Route path="/laerer/missing-attendances/:courseId/:courseHourId" element={<MissingAttendance />} />
              <Route path="/laerer/create-attendance/:courseHourId/:participantId" element={<CreateAttendance />} />
            </Route>
            
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

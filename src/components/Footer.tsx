import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Added more icons
import { SOCIAL_LINKS, CONTACT_INFO } from '../config'; // Assuming CONTACT_INFO is available in config
import { Link } from 'react-router-dom'; // For quick links
// import logo from '/logo.png'; // Assuming a logo.png in public folder
 
 const Footer = () => {
   const currentYear = new Date().getFullYear();
 
   return (
     <footer className="site-footer mt-5"> {/* Removed p-4 */}
       <Container>
         <Row className="mb-4"> {/* Main content rows */}
           {/* Column 1: About Us / Branding */}
           <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
             <img src="https://via.placeholder.com/50x50/800020/FFFFFF?text=LOGO" alt="Iglesia Vino Nuevo Logo" style={{ height: '50px' }} className="mb-3" /> {/* Placeholder logo */}
             <p className="text-white-50">
               Un ministerio dedicado a llevar esperanza, fe y amor a la comunidad, transformando vidas y expandiendo el Reino de Dios.
             </p>
           </Col>
 
           {/* Column 2: Quick Links */}
           <Col md={4} className="text-center mb-4 mb-md-0">
             <h5 className="text-white mb-3">Enlaces Rápidos</h5>
             <Nav className="flex-column">
               <Nav.Link as={Link} to="/" className="text-white-50">Inicio</Nav.Link>
               <Nav.Link as={Link} to="/eventos" className="text-white-50">Eventos</Nav.Link>
               <Nav.Link as={Link} to="/galerias" className="text-white-50">Galerías</Nav.Link>
               <Nav.Link as={Link} to="/contacto" className="text-white-50">Contacto</Nav.Link>
               <Nav.Link as={Link} to="/donaciones" className="text-white-50">Donaciones</Nav.Link>
               {/* Add more links as needed */}
             </Nav>
           </Col>
 
           {/* Column 3: Contact & Social Media */}
           <Col md={4} className="text-center text-md-end">
             <h5 className="text-white mb-3">Contáctanos</h5>
             <ul className="list-unstyled text-white-50">
               {CONTACT_INFO.email && (
                 <li><FaEnvelope className="me-2" /> {CONTACT_INFO.email}</li>
               )}
               {CONTACT_INFO.whatsappNumber && (
                 <li><FaPhoneAlt className="me-2" /> {CONTACT_INFO.whatsappNumber}</li>
               )}
               {CONTACT_INFO.address && (
                 <li><FaMapMarkerAlt className="me-2" /> {CONTACT_INFO.address}</li>
               )}
             </ul>
             <div className="social-links mt-3">
               <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-link me-3 text-white">
                 <FaFacebook size={24} />
               </a>
               <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="footer-social-link me-3 text-white">
                 <FaYoutube size={24} />
               </a>
               <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link text-white">
                 <FaInstagram size={24} />
               </a>
             </div>
           </Col>
         </Row>
 
         {/* Copyright Row */}
         <Row className="mt-4 pt-3 border-top border-secondary">
           <Col className="text-center text-white-50">
             <p className="mb-0">&copy; {currentYear} Iglesia Vino Nuevo. Todos los derechos reservados.</p>
             <p className="mb-0 mt-2">
               Esta página fue creada por el Pastor Renier Garcia.
               <br />
               Si su iglesia desea una página similar, <a href="https://siopermun.com/" target="_blank" rel="noopener noreferrer" className="footer-contact-link">contáctelo aquí</a>.
             </p>
             {/* Legal links could go here if available */}
             {/* <p className="mb-0"><Link to="/privacy" className="text-white-50">Política de Privacidad</Link></p> */}
           </Col>
         </Row>
       </Container>
     </footer>
   );
 };
export default Footer;

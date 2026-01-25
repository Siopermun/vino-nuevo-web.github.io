import { CONTACT_INFO } from '../config';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaHome, FaCalendarAlt, FaBookOpen, FaImages, FaFilm, FaFilePdf, FaEnvelope, FaBible, FaWhatsapp, FaChurch, FaCross, FaGraduationCap, FaQuoteLeft, FaHeart } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      bg="dark" // Changed to dark
      variant="dark" // Changed to dark
      expand="xxl" // Changed from "lg" to "xxl" for a much earlier collapse to hamburger menu
      fixed="top"
      className={`${scrolled ? 'scrolled' : ''}`} // Adjusted padding and removed shadows, no mb-5
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center fw-bold vino-navbar-brand"> {/* Nueva clase para el brand */}
          <FaCross className="me-2"/>
          Vino Nuevo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" end>
              <FaHome className="me-1" /> Inicio
            </Nav.Link>
            
            <NavDropdown title={<><FaChurch className="me-1" /> Iglesia</>} id="church-dropdown" renderMenuOnMount={true}> {/* Added me-3 and renderMenuOnMount */}
              <NavDropdown.Item as={NavLink} to="/quienes-somos">Quiénes Somos</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/vision">Nuestra Visión</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/mision">Nuestra Misión</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/programas-sociales">Nuestros Programas Sociales</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/testimonios">
                <FaQuoteLeft className="me-1" /> Testimonios
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/eventos">
              <FaCalendarAlt className="me-1" /> Eventos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/predicas">
              <FaBookOpen className="me-1" /> Prédicas
            </Nav.Link>

            <Nav.Link as={NavLink} to="/galerias">
              <FaImages className="me-1" /> Galerías
            </Nav.Link>


            
            <NavDropdown title={<>Recursos</>} id="resources-dropdown" renderMenuOnMount={true}> {/* Added me-3 and renderMenuOnMount */}
              <NavDropdown.Item as={NavLink} to="/cursos-y-talleres">
                <FaGraduationCap className="me-1" /> Cursos y Talleres
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/peliculas-cristianas">
                <FaFilm className="me-1" /> Películas
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/libros-pdf">
                <FaFilePdf className="me-1" /> Libros
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/biblia">
                <FaBible className="me-1" /> La Biblia
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/contacto">
              <FaEnvelope className="me-1" /> Contacto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/donaciones">
              <FaHeart className="me-1" /> Donaciones
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
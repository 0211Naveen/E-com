
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Adminnavbar = () => {
  

  const logout = () => {
  
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary bg-nav" id="bg-nav">
        <Container>
          <Navbar.Brand as={Link} to="/dash" className='nav-brand'>
            Antique
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto mt-1 justify-content-between">
              <Nav.Link as={Link} to="/dash" className="nav-names ms-2">Dashboard</Nav.Link>
            </Nav>

            <Nav className="ml-auto d-flex align-items-start">
            
              {/* <Nav.Link as={Link} to="" className="icon-link d-flex align-items-start mt-1">
                <i className="fa-solid fa-user"></i>
              </Nav.Link> */}

              <Nav.Link>
                <span className="nav-user-name fw-5"></span>
              </Nav.Link>

              {/* <Nav.Link className="btn icon-link mt-1" onClick={logout} aria-label="Logout" style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </Nav.Link> */}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Adminnavbar;

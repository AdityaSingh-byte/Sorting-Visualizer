import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'; // Import icons

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
        <span className="mb-3 mb-md-0" style={{color:'#ffffff'}}>
  © 2024 Sort-Visualizer. Open-source project under MIT License.
</span>

        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <FontAwesomeIcon icon={faTwitter} style={{ color: "#ffffff", fontSize: '1.5rem' }} /> {/* Twitter Icon */}
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <FontAwesomeIcon icon={faInstagram} style={{ color: "#ffffff", fontSize: '1.5rem' }} /> {/* Instagram Icon */}
            </a>
          </li>
          <li className="ms-3">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <FontAwesomeIcon icon={faLinkedin} style={{ color: "#ffffff", fontSize: '1.5rem' }} /> {/* LinkedIn Icon */}
          </a>
          </li>
          <li className="ms-3">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          <FontAwesomeIcon icon={faGithub} style={{ color: "#ffffff", fontSize: '1.5rem' }}/>
          </a>
          </li>
          
        </ul>
      </footer>
    </div>
  );
}

export default Footer;

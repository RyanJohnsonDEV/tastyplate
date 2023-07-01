import './Header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-main">
      <Link to="/">
        <div>
          <img src={logo} alt="logo" className="logo" />
        </div>
      </Link>
    </div>
  );
}

export default Header;

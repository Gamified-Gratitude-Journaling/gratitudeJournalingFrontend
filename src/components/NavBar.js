import react from "react";
import { NavLink } from "react-router-dom";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';

export default function NavBar() {
    const token = sessionStorage.getItem('token');
    return (
        <div className="bg-white">
            <header>
                <NavLink to="/Journal" className='_logoNav'>
                    <img src={logo} width={37} height={39} alt=' ' />
                </NavLink>
                <nav>
                    <ul className='nav_links'>
                        <li><NavLink to="/Journal">Journal</NavLink></li>
                        {!token && <NavLink to="/Login">Authenticate</NavLink>}
                        <li><NavLink to='/Awards'>Awards</NavLink></li>
                        <li><NavLink to='/Surveys'>Surveys</NavLink></li>
                    </ul>
                </nav>
                <NavLink to='/Profile'><img src={user} width={37} height={39} alt=' ' /></NavLink>
            </header>
        </div>
    )
} 
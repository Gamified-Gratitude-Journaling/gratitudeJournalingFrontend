import react from "react";
import { NavLink } from "react-router-dom";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';

export default function NavBar() {
    const token = sessionStorage.getItem('token');
    return (
        <div>
            <header>
                <NavLink to="/Profile" className='_logoNav'>
                    <img src={logo} width={37} height={39} alt=' ' />
                    <p className='p-2'> Gratitude Journal </p>
                </NavLink>
                <nav>
                    <ul className='nav_links'>
                        <li><NavLink to="/Journal">Journal</NavLink></li>
                        {!token && <NavLink to="/Login">Authenticate</NavLink>}
                        <li><NavLink to='/Awards'>Awards</NavLink></li>
                        <li><NavLink to='/Surveys'>Surveys</NavLink></li>
                        <li><NavLink to='/Stats'>Stats</NavLink></li>
                    </ul>
                </nav>
                <a href='#'><img src={user} width={37} height={39} alt=' ' /></a>
            </header>
        </div>
    )
} 
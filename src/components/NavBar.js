import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';


export default function NavBar() {
    const [navLinkOpen, navLinkToggle] = useState(false);
    const location = useLocation();

    if (location.pathname.localeCompare("/login") === 0) return <></>
    const token = sessionStorage.getItem('token');
    if (!token) {
        return (<nav className="navBar place-content-center"><NavLink to='/login'>Login</NavLink></nav>)
    }
    const username = sessionStorage.getItem('username');

    const handleNavLinksToggle = () => {
        navLinkToggle(!navLinkOpen);
    }

    const renderClass = () => {
        let classes = "nav_links";

        if (navLinkOpen) {
            classes += " active backdrop-blur-lg";
            //document.body.style.display = "none";
        }

        else {
            //document.body.style.overflow = "scroll";
        }

        return classes;
    }

    return (
        <div>
            <nav className='navBar place-content-around'>
                <ul className={renderClass()}>
                    <li><NavLink to={`/profile/${username}`}>
                        <div className="flex">
                            <img src={user} />
                            <h1 className="pl-2">Profile</h1>
                        </div>
                    </NavLink></li>
                    <li><NavLink to='/journal'><h1>Journal</h1></NavLink></li>
                    <li><NavLink to='/leaderboard'><h1>Leaderboard</h1></NavLink></li>
                </ul>

                <NavLink to='#' className="._logoNav">
                    <img src={logo} width={37} height={39} alt=' ' />
                </NavLink>

                <div onClick={() => handleNavLinksToggle()} className='burger' id='burgerS'>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
            </nav>
        </div>
    )
} 
import react from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';



export default function NavBar() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    console.log(sessionStorage);
    const [navLinkOpen, navLinkToggle] = useState(false);
    const handleNavLinksToggle = () => {
        navLinkToggle(!navLinkOpen);
    }

    const renderClass = () => {
        let classes = "nav_links";

        if (navLinkOpen) {
            classes += " active backdrop-blur-lg z-50";
            //document.body.style.display = "none";
        }

        else {
            document.body.style.overflow = "scroll";
        }

        return classes;
    }

    return (


        <div>


            <nav className='navBar place-content-around'>


                <ul className={renderClass()}>
                    <li><NavLink to={`/Profile/${username}`}>
                        <div className="flex">
                            <img src={user} />
                            <h1 className="pl-2">Profile</h1>
                        </div>
                    </NavLink></li>
                    <li><NavLink to='/Journal'><h1>Journal</h1></NavLink></li>
                    <li><NavLink to='/Leaderboard'><h1>Leaderboard</h1></NavLink></li>

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
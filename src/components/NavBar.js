import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';
import authContext from "../context/auth-context";


export default function NavBar() {
    const { token, username } = useContext(authContext);
    const [navLinkOpen, navLinkToggle] = useState(false);
    const location = useLocation();

    if (location.pathname.localeCompare("/login") === 0) return <></>
    if (!token) {
        return (<nav className="navBar place-content-center"><NavLink to='/login'>Login</NavLink></nav>)
    }

    const handleNavLinksToggle = () => {
        navLinkToggle(!navLinkOpen);
    }

    const renderClass = () => {
        let classes = "nav_links items-center";
        // let toDisable = document.getElementById('journalEditor');
        let toDisable = document.getElementById('mainBodyDiv');

        if (navLinkOpen) {
            classes += " active backdrop-blur-lg";
            
            toDisable.classList.remove('textBox_active');
            toDisable.classList.add('textBox_deactive');

        }

        else {
            if(toDisable !== null){

                toDisable.classList.remove('textBox_deactive');
                toDisable.classList.add('textBox_active');
            }



        }

        return classes;
    }

    return (
        <div>
            <nav className='navBar'>


                <NavLink to='#' className="._logoNav">
                    <img src={logo} width={37} height={39} alt=' ' />
                </NavLink>

                <ul className={renderClass()}>

                    <li><NavLink to='/journal'><h2>Journal</h2></NavLink></li>
                    <li><NavLink to='/leaderboard'><h2>Leaderboard</h2></NavLink></li>
                    <li><NavLink to={`/profile/${username}`}>
                        <div className="flex items-center">
                            <h2 >Profile</h2>
                            <img className="pl-2" src={user} />

                        </div>
                    </NavLink></li>
                </ul>

                <div onClick={() => handleNavLinksToggle()} className='burger'>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
            </nav>
        </div>
    )
} 
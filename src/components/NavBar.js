import react from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';



export default function NavBar() {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const [navLinkOpen, navLinkToggle] = useState(false);
    const handleNavLinksToggle =() => {
        navLinkToggle(!navLinkOpen);
    }

    const renderClass =()=> {
        let classes = "nav_links";

        if(navLinkOpen){
            classes += " active";
            document.body.style.overflow = "hidden";
        }

        else{
            document.body.style.overflow = "scroll";
        }

        return classes;
    }

    return (

        
        <div>
            
            
            <nav className = 'navBar place-content-evenly'>
                
                <NavLink to = '#' className="._logoNav">
                    <img src = {logo} width = {37} height = {39} alt = ' '/>
        
                </NavLink>
                
                <ul className = {renderClass()}>
                    <li><NavLink to = '/Journal'>Journal</NavLink></li>
                    <li><NavLink to = '/Leaderboard'>Leaderboard</NavLink></li>
                    <li><NavLink to = {`/Profile/${username}`}>
                        <div className="flex"><p className="pr-2">Profile</p><img src={user}/></div>
                    </NavLink></li>
                    
                </ul>



                <div onClick = {() => handleNavLinksToggle()} className = 'burger' id = 'burgerS'>
                    <div className = 'line1'></div>
                    <div className = 'line2'></div>
                    <div className = 'line3'></div>
                </div>

            </nav>

        </div>
        
            
        
    )
} 
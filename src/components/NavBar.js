import react from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';



export default function NavBar() {
    const token = sessionStorage.getItem('token');
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
            
            
            <nav class = 'navBar'>
                
                <NavLink to = '#' className="._logoNav">
                    <img src = {logo} width = {37} height = {39} alt = ' '/>
        
                </NavLink>
                
                <ul className = {renderClass()}>
                    <li><NavLink to = '/Journal'>Journal</NavLink></li>
                    <li><NavLink to = '/Awards'>Awards</NavLink></li>
                    <li><NavLink to = '/Surveys'>Surveys</NavLink></li>
                    <li><NavLink to = '/Profile'><img src={user}/></NavLink></li>
                    
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
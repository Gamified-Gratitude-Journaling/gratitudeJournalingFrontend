import react from "react";
import { useState } from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';
import hamburger from '../pages/images/hamburger.png';



const NavBar = () => {
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
                
                <a href = '#' className="._logoNav">
                    <img src = {logo} width = {37} height = {39} alt = ' '/>
        
                </a>
                
                <ul className = {renderClass()}>
                    <li><a href = '#'>Journal</a></li>
                    <li><a href = '#'>Awards</a></li>
                    <li><a href = '#'>Surveys</a></li>
                    <li><a href = '#'><img src={user}/></a></li>
                    
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

export default NavBar
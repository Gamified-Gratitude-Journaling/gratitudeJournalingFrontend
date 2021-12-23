import react from "react";
import '../index.css';
import logo from '../pages/images/gratitude symbol.png';
import user from '../pages/images/user.png';

const NavBar = () => {
    return (
        <div>
            {/* <header>
            
            <a href = '#' className = '_logoNav'> 
                    <img src = {logo} width = {37} height = {39} alt = ' '/>

                    <p className = 'p-2'> Gratitude Journal </p>

            </a>
        

            
            <nav>
                <ul className = 'nav_links'>
                    <li><a href = '#'>Journal</a></li>
                    <li><a href = '#'>Awards</a></li>
                    <li><a href = '#'>Surveys</a></li>
                    
                </ul>

            </nav> */}

            {/* <a href = '#'><image source = {user} alt = ''/></a> */}
            {/* <a href = '#'><img src = {user} width = {37} height = {39} alt = ' '/></a> */}
        
            {/* </header> */}
            
            <nav class = 'navBar'>
                <a href = '#' className="._logoNav">
                    <img src = {logo} width = {37} height = {39} alt = ' '/>
        
                </a>

                <ul className = 'nav_links'>
                    <li><a href = '#'>Journal</a></li>
                    <li><a href = '#'>Awards</a></li>
                    <li><a href = '#'>Surveys</a></li>
                    
                </ul>

            </nav>
        </div>
        
       
            
        
        
    )
}

export default NavBar
import user from '../pages/images/user.png';

const LeadingPlayers = () => {
    return(
        <div className = 'player-score-box'>
            <ul className = 'player-scores'>
                <li>
                    <a href = '#' className = '_logoNav'> 
                            <img src = {user} width = {37} height = {39} alt = ' '/>

                            <p className = 'p-2'> Gratitude Journal </p>

                    </a>
                </li>

                <li><a href = '#'>Awards</a></li>
                <li><a href = '#'>Places</a></li>
                
            </ul>
 

            
        </div>
    )
}

export default LeadingPlayers
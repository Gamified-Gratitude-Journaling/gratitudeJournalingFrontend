import { NavLink } from 'react-router-dom';
import userImg from '../pages/images/user.png';

export default function LeadingPlayer({ user, points }) {
    const currentUsername = sessionStorage.getItem("username");
    return (
        <div className={`player-score-box ${ currentUsername && currentUsername.localeCompare(user.username) === 0 && "bg-blue-100" }`}>
            <NavLink to={`/Profile/${user.username}`}>
                <ul className='player-scores'>
                    <li>
                        <div className='_logoNav'>
                            <img src={userImg} width={37} height={39} alt=' ' />
                            <p className='p-2'> {user.username} </p>
                        </div>
                    </li>
                    <li><p>{points} Points</p></li>
                </ul>
            </NavLink>
        </div>
    )
}

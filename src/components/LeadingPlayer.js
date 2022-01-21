import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import authContext from '../context/auth-context';
import userImg from '../pages/images/user.png';

export default function LeadingPlayer({ user, points, place }) {
    const { username: currentUsername, isTreatment } = useContext(authContext);

    const isCurrentPlayer = currentUsername && currentUsername.localeCompare(user.username) === 0;

    const userEl = (
        <div className={`player-score-box ${isCurrentPlayer && "bg-indigo-100"}`}>
            <NavLink to={`/profile/${user.username}`}>
                <ul className='player-scores'>
                    {!isTreatment && <li><h1><b>#</b> {place}</h1></li>}
                    <li>
                        <div className='_logoNav'>
                            <img src={userImg} width={37} height={39} alt=' ' />
                            <p className='p-2'> {user.username} </p>
                        </div>
                    </li>
                    {!isTreatment && <li><p>{points} Points</p></li>}
                </ul>
            </NavLink>
        </div>
    )
    if (isCurrentPlayer) {
        return (<div className='sticky bottom-0 '>
            {userEl}
        </div>)
    }
    return userEl;
}

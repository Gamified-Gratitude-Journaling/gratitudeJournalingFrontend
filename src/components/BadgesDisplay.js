import { useState } from 'react';
import { RiBookletFill } from 'react-icons/ri';
import Modal from './Modal';

const colors = ["gray-300", "blue-300", "green-300", "red-300", "purple-300", "yellow-400"]
export default function BadgesDisplay({ totalPoints, likes, totalWords, longestStreak, currentStreak }) {
	const [activeBadge, setActiveBadge] = useState("");
	const badges = [
		{
			name: "Collector",
			icon: RiBookletFill,
			levels: [0, 10, 50, 100, 200, 400],
			value: totalPoints,
			description: ["Awarded for total accumulated points", `Total points: ${totalPoints}`],
		},
		{
			name: "Contributor",
			icon: RiBookletFill,
			levels: [0, 10, 50, 100, 200, 400],
			value: likes,
			description: ["Awarded for total likes on contributed prompts", `Total likes: ${likes}`],
		},
		{
			name: "Journalist",
			icon: RiBookletFill,
			levels: [0, 10, 50, 100, 200, 400],
			value: totalWords,
			description: ["Awarded for total words written in journals", `Words: ${totalWords}`],
		},
		{
			name: "Wildfire",
			icon: RiBookletFill,
			levels: [0, 10, 50, 100, 200, 400],
			value: longestStreak,
			description: ["Awarded for longest consecutive days journaled", `Longest Streak: ${longestStreak}`, `Current Streak: ${currentStreak}`],
		},
	]
	return (<div className="grid sm:grid-cols-2">
		{badges.map(badge => {
			let ind = 0;
			badge.levels.forEach(val => { if (badge.value > val) ind++; });

			return (<div
				className={`cursor-pointer mx-auto rounded-md bg-${colors[ind]} my-4`}
				key={badge.name}
				onClick={() => {
					/*if (activeBadge.length>0) setActiveBadge("");
					else */
					setActiveBadge(badge.name);
				}}
			>
				<badge.icon
					className='w-40 h-40 mix-blend-soft-light'
				/>
				<div className='w-full border-t-2 rounded border-opacity-10 border-black'></div>
				<p className='text-center mix-blend-soft-light text-black my-1'>{badge.name}</p>
				{
					< Modal
					isOpen={badge.name.localeCompare(activeBadge) === 0}
					header={badge.name}
					handleClose={()=>{setActiveBadge("")}}
				>
					{badge.description.map((text, i) => {
						return <p 
							className={`text-center text-lg ${i !== 0 && "text-gray-400"}`}
							key={`${badge.name}Desc${i}`}
						>
							{text}
						</p>
					})}
				</Modal>}
			</div>)
		})}
	</div >);
}
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../index.css';

export default function About() {
	// return (<div className="grid space-y-2 px-10 text-justify">
	// 	<h1 className="text-center">About this project</h1>
	// 	<p>
	// 		For my Capstone project, I’m researching how adding game-elements (streaks, points, badges, etc.) to a digital gratitude journaling application impacts mental well-being and engagement in adolescents between 14 to 18 years old.
	// 		For those who don’t know, gratitude journaling is an activity where one regularly writes 3 to 5 things they are grateful for.
	// 	</p>
	// 	<h1 className="text-center">Your task</h1>
	// 	<p>
	// 		If you haven't already, make sure to register with the email your school email.
	// 		Over the next 4 weeks, I would like you to use this app at least once every other day.
	// 	</p>
	// 	<p>
	// 		<b>At minimum:</b>
	// 		<ul className="list-decimal px-10">
	// 			<li>Spend at least 1 minute on the online writing task every other day</li>
	// 			<li>Complete a 1-minute survey at the end of each week</li>
	// 			<li>Complete a 10-minute survey every two-weeks.</li>
	// 		</ul>
	// 	</p>
	// 	<p>
	// 		Beyond that, feel free to freely explore the app and it's features!
	// 	</p>
	// 	<h1 className="text-center">After the 4 weeks</h1>
	// 	<p>
	// 		You will get your 2 service hours! 
	// 		Additionally, I’d like to interview 4 randomly-selected participants, which will take between 30 to 45-minutes each.
	// 		To reiterate the informed consent document, your participation in this interview and/or this project is completely optional. 
	// 	</p>
	// </div>)
	AOS.init();

	let classRemover = document.getElementById('mainBodyDiv');
	

	return(
		<div className='aboutLink bg-blue-400 page'>
			<p>Hello World!</p>
		</div>
	)
}
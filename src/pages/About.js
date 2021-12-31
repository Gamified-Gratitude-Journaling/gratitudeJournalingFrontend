import AOS from 'aos';
import 'aos/dist/aos.css';
import '../index.css';
import gamePad from '../pages/images/gamePad.png';
import tasks from '../pages/images/tasks.png';
import interview from '../pages/images/interview.png';
import logo from '../pages/images/gratitude symbol.png';

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


	return(
		

		<div className = 'page aboutLink'>
			<div className='h-screen bg-blue-400 flex justify-center items-center'>
				<p className='font-semibold title' data-AOS='zoom-in'>Gratitude Journal</p>	
			</div>

			<div className = 'h-full bg-red-200 p-5' data-AOS='fade-up' data-AOS-duration='2000'>
				<p className = 'font-semibold title text-center'>About the project</p>

				<div className='aboutPage'>
					<p className='aboutText pt-5'>
						Hi! I'm Ray Wang! For my Capstone project, I'm researching how adding game elements to a digital gratitude journaling application impacts mental
						well-being and engagement!

						<br/>
						<br/>

						Objects for this research are adolecents between 14 and 18 years old!

						<br/>
						<br/>

						Gratitude journal is when someone regularly writes 3 to 5 things they are grateful for in a journal


					</p>

					<img className = 'mx-auto pt-5' src={gamePad}/>
				</div>
				
			</div>

			<div className = 'h-full bg-yellow-200 p-5' data-AOS='fade-up' data-AOS-duration='2000'>
				<p className = 'font-semibold title text-center'> Your Task</p>
				
				<div className = 'aboutPage'>
					<p className='aboutText pt-5'>
						Make sure you register an account with your school email address!

						<br/>
						<br/>

						Over the next 4 weeks, it would be grateful if you could use the app at least one every other day.

						<br/>
						<br/>

						<p className='aboutText font-semibold'>
							At minium:
						</p>

						<ul className="aboutText list-decimal px-10">
							<li>Spend at least 1 minute on the online writing task every other day</li>
							<li>Complete a 1-minute survey at the end of each week</li>
							<li>Complete a 10-minute survey every two-weeks.</li>
						</ul>

						<br/>

						<p className='aboutText'>
							Otherwise! Be feel free to explore the gratefulness of the Grateful Journal!!
						</p>
					</p>
						


					<img className = 'mx-auto pt-5' src = {tasks}/>

				</div>
				
			</div>

			<div  className = 'h-full bg-yellow-500 p-5' data-AOS='fade-up' data-AOS-duration='2000'>
				<p className = 'title font-semibold text-center'>After 4 weeks</p>

				<div className='aboutPage mt-5'>
					<p className='aboutText p-5'>
						You will receive 2 service hours!!
						<br/>
						<br/>
						Additionally, I'd like to interview 4 random participants. The interview will take about 30 to 45 minutes each. 
						TO reiterate the informed consent document, your participation in this interview and/or in this project is completely optional
					</p>
					<img className = 'mx-auto p-5'src={interview}/>
				</div>
			</div>
		</div>
	)
}
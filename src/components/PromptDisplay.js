import { AiOutlineLike } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { gql, useQuery, useMutation, } from '@apollo/client';
import Spinner from './Spinner/Spinner';
import { NavLink } from 'react-router-dom';
import authContext from '../context/auth-context';
import { CgProfile } from 'react-icons/cg';

const FETCH_PROMPT = gql(`
	query FetchPrompt {
		prompt {
			prompt {
				_id
				content
				user {
					username
				}
			}	
			liked
		}
	}
`);

const LIKE_PROMPT = gql(`
	mutation LikePrompt($prompt: ID!) {
		likePrompt(prompt: $prompt) {
			likes
		}
	}
`);



const RandomPromptDisplay = () => {
	const { username } = useContext(authContext);
	let { loading, error, data, refetch } = useQuery(FETCH_PROMPT);
	const [likePromptMutation] = useMutation(LIKE_PROMPT);
	const [isLiked, setIsLiked] = useState(false);
	useEffect(() => { if (data) setIsLiked(data.liked) }, [data]);

	if (loading) { return <Spinner /> }
	data = data.prompt;

	const like = () => {
		likePromptMutation({ variables: { prompt: data.prompt._id } });
		setIsLiked(!isLiked);
	}

	const getPrompt = () => { refetch(); }

	return (
		<div className="grid w-full mx-auto px-2 rounded-lg bg-white drop-shadow-lg pt-4 sm:px-10 mb-4">
			<div className="rounded-lg mb-6 px-2">
				<div className='grid grid-cols-2'>
					<NavLink className='justify-self-end' to={`/profile/${data.prompt.user.username}`}>
						<div className='flex place-content-center grid-cols-2'>
							<div className="grid place-content-center overflow-hidden rounded-full w-20 h-20 shadow-lg -mt-10">
								<CgProfile className='w-12 h-12' />
							</div>
							<div className='flex place-content-center ml-4'>
								<p className="text-md text-indigo-500 font-bold text-end">{data.prompt.user.username}</p>
								{/*<p className="text-xs text-gray-500 text-center">@scott.windon</p>*/}
							</div>
						</div>
					</NavLink>
					<NavLink to="/Contribute" className='justify-self-end' >
						<p className='text-gray-300 hover:text-yellow-400'>Contribute?</p>
					</NavLink>
				</div>
				<div className="flex place-content-center w-full mb-4 pt-4">
					<div className="text-3xl text-indigo-500 text-left h-3 -mt-2">“</div>
					<p className="text-lg text-gray-600 text-center px-1 mx-1">{data.prompt.content}</p>
					<div className="text-3xl text-indigo-500 text-right h-3 -mt-2">”</div>
				</div>

			</div>

			<div className="grid grid-cols-2 border-t-2 mb-2 pt-2 px-2 sm:px-5">
				<div className=' md:pl-10'>
					{data.prompt.user.username !== username &&
						<div onClick={like} className='h-4 w-4 cursor-pointer'>
							<AiOutlineLike color={isLiked ? "gold" : "gray"} />
						</div>
					}
					{/*<div onClick={like.bind(this,false)} className='h-4 w-4 mr-4'><AiOutlineDislike color={data.liked && "SteelBlue"}/></div>*/}


				</div>

				<div
					className='flex place-content-end cursor-pointer'
					onClick={getPrompt}
				>
					<p className='text-gray-300 hover:text-yellow-400'>Random prompt</p>
				</div>


			</div>
		</div >
	);
}


export default function PromptDisplay() {
	const [isRandom, setIsRandom] = useState(false);

	const getPrompt = () => {
		setIsRandom(false);
		setIsRandom(true);
	}

	if (isRandom) { return <RandomPromptDisplay /> }

	return (
		<div className="grid w-full mx-auto px-2 rounded-lg bg-white drop-shadow-lg pt-4 sm:px-10 mb-4">
			<div className=" rounded-lg mb-6 px-2">
				<div className="flex w-full mb-4 pt-4">
					<div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
					<p className="text-lg text-gray-600 text-center px-1">There are many things in our lives, both large and small, that we might
						be grateful about. Think back over the past week and write down on
						the lines below up to five things in your life that you are grateful or
						thankful for.</p>
					<div className="text-3xl text-indigo-500 text-right leading-tight h-3">”</div>
				</div>
			</div>
			<div className="grid grid-cols-2 border-t-2 mb-2 pt-2 px-1 sm:px-5 items-center">
				<div
					className='text-left cursor-pointer'
					onClick={getPrompt}
				>
					<p className='text-gray-300 hover:text-yellow-400'>Random prompt</p>
				</div>
				<NavLink to="/Contribute" className='text-right' >
					<p className='text-gray-300 hover:text-yellow-400'>Contribute?</p>
				</NavLink>
			</div>
		</div >
	)
}
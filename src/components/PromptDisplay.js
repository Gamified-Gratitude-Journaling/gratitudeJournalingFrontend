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



export default function PromptDisplay() {
	const { username } = useContext(authContext);
	let { loading, error, data } = useQuery(FETCH_PROMPT);
	const [likePromptMutation] = useMutation(LIKE_PROMPT);
	const [isLiked, setIsLiked] = useState(false);
	useEffect(() => { if (data) setIsLiked(data.liked) }, [data]);

	if (loading) { return <Spinner /> }
	data = data.prompt;

	const like = () => {
		likePromptMutation({ variables: { prompt: data.prompt._id } });
		setIsLiked(!isLiked);
	}

	return (
		<div className="grid w-full mx-auto px-2 rounded-lg bg-white drop-shadow-lg pt-4 sm:px-10 mb-4">
			<div className=" rounded-lg mb-6 px-2">
				<NavLink to={`/profile/${data.prompt.user.username}`}>
					<div className='flex place-content-center grid-cols-2'>
						<div className="grid place-content-center overflow-hidden rounded-full w-20 h-20 shadow-lg -mt-10">
							<CgProfile className='w-12 h-12' />
						</div>
						<div className='flex place-content-center ml-4'>
							<p className='text-gray-400'>Prompt by:&#160;</p><p className="text-md text-blue-500 font-bold text-end">{data.prompt.user.username}</p>
							{/*<p className="text-xs text-gray-500 text-center">@scott.windon</p>*/}
						</div>
					</div>
				</NavLink>
				<div className="w-full mb-4 pt-4">
					<div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
					<p className="text-lg text-gray-600 text-center px-1">{data.prompt.content}</p>
					<div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
				</div>

			</div>

			<div className="grid grid-cols-2 border-t-2 mb-2 pt-2 px-5 items-center">
				<div className=' w-full md:pl-10 cursor-pointer'>
					{data.prompt.user.username !== username &&
						<div onClick={like} className='h-4 w-4'>
							<AiOutlineLike color={isLiked ? "gold" : "gray"} />
						</div>
					}
					{/*<div onClick={like.bind(this,false)} className='h-4 w-4 mr-4'><AiOutlineDislike color={data.liked && "SteelBlue"}/></div>*/}


				</div>

				<NavLink to="/Contribute" className='text-right' >
					<p className='text-gray-300 hover:text-yellow-400'>Contribute?</p>
				</NavLink>


			</div>
		</div >
	);
}
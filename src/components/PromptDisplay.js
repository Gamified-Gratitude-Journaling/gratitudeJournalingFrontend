import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, } from '@apollo/client';
import Spinner from './Spinner/Spinner';
import { NavLink } from 'react-router-dom';

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
	const username = sessionStorage.getItem("username");
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
		<div className="grid w-full mx-auto px-2 rounded-lg bg-white drop-shadow-lg pt-4 sm:px-10 text-gray-800 mb-4">
			<div className="bg-clip-border bg-gradient-to-r via-white from-yellow-50 mb-6 border-l-4 px-2">
				{/* Profile Picture
				<div className="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
				<div className="w-full">
						<img src="https://randomuser.me/api/portraits/men/15.jpg" alt="" />
					</div>
				</div>
					*/}
				<div className="w-full mb-4 pt-4">
					{/*<div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>*/}
					<p className="text-lg text-gray-600 text-center px-1">{data.prompt.content}</p>
					{/*<div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>*/}
				</div>
				<div className="w-full pr-4 sm:pr-16">
					<div className='flex place-content-end'>
						<NavLink className="flex" to={`/profile/${data.prompt.user.username}`}>
							<p className='text-gray-400'>Prompt by:&#160;</p><p className="text-md text-blue-500 font-bold text-end">{data.prompt.user.username}</p>
						</NavLink>
						{/*<p className="text-xs text-gray-500 text-center">@scott.windon</p>*/}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 border-t-2 mb-2 rounded-sm pt-2">
				<div className='flex w-full pl-6 md:pl-10 cursor-pointer'>
					{data.prompt.user.username !== username &&
						<div onClick={like} className='h-4 w-4 mr-4'>
							<AiOutlineLike color={isLiked ? "gold" : "gray"} />
						</div>
					}
					{/*<div onClick={like.bind(this,false)} className='h-4 w-4 mr-4'><AiOutlineDislike color={data.liked && "SteelBlue"}/></div>*/}
				</div>
				<NavLink to="/Contribute" className='place-self-center'>
					<p className='text-gray-300 hover:text-yellow-400'>Contribute?</p>
				</NavLink>
			</div>
		</div >
	);
}
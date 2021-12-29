export default function Notification({children}) {
	return (<div className="m-none bg-indigo-900 text-center py-4 lg:px-4">
		<div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
			{/*<span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>*/}
			<span class="font-semibold mr-2 text-left flex-auto">
				{children}
			</span>
		</div>
	</div>)
}
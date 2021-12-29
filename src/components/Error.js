export default function Error({ error, resetErrorBoundary }) {
	console.log(error);

	return (<div role="alert">
		<p>Something went wrong. Please refresh the page and try again</p>
		<pre>{error.message}</pre>
	</div>)
}
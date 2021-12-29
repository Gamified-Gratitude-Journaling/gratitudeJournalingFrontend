import * as test from './tests/backend/test';

export default function Test() {
	return (
		<div>
			<button onClick={test}>Run Tests</button>
			<button onClick={()=>{throw new Error('Test error')}}>Throw error</button>
		</div>
	)
}
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Posts } from "./components/posts"

function App() {
	return (
		<div className='App'>
			<h1 className='main-heading'>Posting Platform</h1>
			<Posts />
		</div>
	)
}

export default App

import { useState } from "react"

export const PostForm = ({ createPost }) => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [userId] = useState(1)

	const onSubmitHandler = e => {
		e.preventDefault()
		createPost({ title, body, userId })
		setTitle("")
		setBody("")
	}

	return (
		<section>
			<section className='post-form'>
				<h3 className='heading'>Create Post </h3>
				<form onSubmit={onSubmitHandler}>
					<input
						value={title}
						onChange={e => setTitle(e.target.value)}
						type='text'
						placeholder='Title'
					/>
					<textarea
						value={body}
						onChange={e => setBody(e.target.value)}
						placeholder='Body'
					/>
					<button type='submit'>Create Post</button>
				</form>
			</section>
		</section>
	)
}

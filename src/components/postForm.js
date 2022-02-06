import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export const PostForm = ({ createPost, isLoadingCreatePost }) => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [error, setError] = useState("")
	const [userId] = useState(1)

	const onSubmitHandler = async e => {
		e.preventDefault()
		if (title === "" || body === "") {
			setError("Please fill in all fields.")
		} else {
			setError("")
			await createPost({ title, body, userId, id: uuidv4() })
			setTitle("")
			setBody("")
		}
	}

	return (
		<section>
			<section className='post-form'>
				<h3 className='heading'>Create Post </h3>
				<form onSubmit={onSubmitHandler}>
					<input
						disabled={isLoadingCreatePost}
						value={title}
						onChange={e => setTitle(e.target.value)}
						type='text'
						placeholder='Title'
					/>
					<textarea
						disabled={isLoadingCreatePost}
						value={body}
						onChange={e => setBody(e.target.value)}
						placeholder='Body'
					/>
					<p className='error'>
						<small>{error}</small>
					</p>
					<button type='submit' disabled={isLoadingCreatePost}>
						{isLoadingCreatePost ? "Creating..." : "Create Post"}
					</button>
				</form>
			</section>
		</section>
	)
}

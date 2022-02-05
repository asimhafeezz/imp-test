import axios from "axios"
import { useEffect, useState } from "react"
import { PostForm } from "./postForm"

export const Posts = () => {
	//local state
	const [posts, setPosts] = useState([])

	//create post
	const createPost = async data => {
		try {
			const res = await axios.post(
				"https://jsonplaceholder.typicode.com/posts",
				data
			)
			setPosts([res.data, ...posts])
		} catch (err) {
			console.error("err :: ", err)
		}
	}

	//delete post
	const deletePost = id => {
		try {
			axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
			setPosts(posts.filter(post => post.id !== id))
		} catch (err) {
			console.error("err :: ", err)
		}
	}

	//run on component mount and fetch posts
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get(
					"https://jsonplaceholder.typicode.com/posts"
				)
				setPosts(res.data)
			} catch (err) {
				console.error("err :: ", err)
			}
		}
		fetchPosts()
	}, [])

	return (
		<>
			<PostForm createPost={createPost} />
			<>
				<h3 className='heading'>
					Posts{" "}
					<span>
						<small>(new post created will be on top.)</small>
					</span>
				</h3>
				<section className='posts'>
					{posts.map(post => (
						<article className='post' key={post.id}>
							<h3>{post.title.slice(0, 20)}</h3>
							<p>
								{post.body.length >= 100
									? post.body.slice(0, 100) + "..."
									: post.body}
							</p>
							<button
								className='delete-button'
								onClick={() => deletePost(post.id)}>
								Delete
							</button>
						</article>
					))}
				</section>
			</>
		</>
	)
}

import axios from "axios"
import { useEffect, useState } from "react"
import { DeleteModal } from "./deleteModal"
import { PostForm } from "./postForm"

export const Posts = () => {
	//local state
	const [posts, setPosts] = useState([])
	const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false)
	const [loadingPost, setLoadingPost] = useState(false)

	//create post
	const createPost = async data => {
		setIsLoadingCreatePost(true)
		try {
			await axios.post("https://jsonplaceholder.typicode.com/posts", data)
			setPosts([data, ...posts])
			setIsLoadingCreatePost(false)
		} catch (err) {
			setIsLoadingCreatePost(false)
			console.error("err :: ", err)
		}
	}

	//delete post
	const deletePost = async id => {
		try {
			await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
			setPosts(posts.filter(post => post.id !== id))
		} catch (err) {
			console.error("err :: ", err)
		}
	}

	//run on component mount and fetch posts
	useEffect(() => {
		const fetchPosts = async () => {
			setLoadingPost(true)
			try {
				const res = await axios.get(
					"https://jsonplaceholder.typicode.com/posts"
				)
				setPosts(res.data)
				setLoadingPost(false)
			} catch (err) {
				setLoadingPost(false)
				console.error("err :: ", err)
			}
		}
		fetchPosts()
	}, [])

	return (
		<>
			<PostForm
				createPost={createPost}
				isLoadingCreatePost={isLoadingCreatePost}
			/>
			<>
				<h3 className='heading ml'>
					Posts{" "}
					<span>
						<small>(new post created will be on top.)</small>
					</span>
				</h3>
				<section className='posts'>
					{loadingPost ? (
						<p className='loading-section'>Loading Posts...</p>
					) : (
						posts.map(post => (
							<article className='post' key={post.id}>
								<section>
									<h3>{post.title.slice(0, 20)}</h3>
									<p>
										{post.body.length >= 100
											? post.body.slice(0, 100) + "..."
											: post.body}
									</p>
								</section>
								<DeleteModal deletePost={() => deletePost(post.id)} />
							</article>
						))
					)}
				</section>
			</>
		</>
	)
}

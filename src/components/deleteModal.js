import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"

export const DeleteModal = ({ deletePost }) => {
	const [show, setShow] = useState(false)
	const [disabled, setDisabled] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const deletePostHandler = async () => {
		setDisabled(true)
		try {
			await deletePost()
			handleClose()
			setDisabled(false)
		} catch (err) {
			setDisabled(false)
			console.error("err :: ", err)
		}
	}

	// clean up memory leaks
	useEffect(() => {
		return () => {
			setDisabled(false)
			setShow(false)
		}
	}, [])

	return (
		<>
			<Button size='sm' variant='danger' onClick={handleShow}>
				Delete
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete post</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure , you want to delete this post?</Modal.Body>
				<Modal.Footer>
					<Button size='sm' variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button
						size='sm'
						disabled={disabled}
						variant='danger'
						onClick={deletePostHandler}>
						{disabled ? "Deleting..." : "Delete"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

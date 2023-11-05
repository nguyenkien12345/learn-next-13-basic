"use client"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showCreateModal: boolean;
    setShowCreateModal: (value: boolean) => void;
}

const CreateModal = (props: IProps) => {
    const {showCreateModal, setShowCreateModal} = props;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = () => {
        if(!title) {
            toast.error("Please Enter Title");
            return;
        }
        if(!author) {
            toast.error("Please Enter Author");
            return;
        }
        if(!content) {
            toast.error("Please Enter Content");
            return;
        }
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, author, content})
        })
        .then((res) => res.json())
        .then((res) => {
            toast.success("Create new blog successfully");
            handleCloseModal();
            mutate("http://localhost:8000/blogs"); 
        })
        .catch((error) => {
            toast.error("Create new blog failed");
            handleCloseModal();
        })
    };

    const handleCloseModal = () => {
        setTitle("");
        setAuthor("");
        setContent("");
        setShowCreateModal(false);
    };

    return (
        <>
        <Modal
            show={showCreateModal}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New A Blog</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type="text" 
                        name='title' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Please Enter Title: " 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control 
                        type="text" 
                        name='author' 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        placeholder="Please Enter Author: " />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name='content' 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
        </>
      );
}

export default CreateModal;

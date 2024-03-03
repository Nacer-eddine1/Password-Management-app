import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addPassword, getTokenFromCookie } from '../../hooks/passwordsHook';
import { toast } from 'react-toastify';

const AddPasswordModal = (props) => {
    const [title, setTitle] = useState('');
    const [app_name, setAppName] = useState('');
    const [link, setLink] = useState('');
    const [username, setUsername] = useState('');
    const [generated_password, setGeneratedPassword] = useState('');

    const generatePassword = () => {
        // Logic to generate a random password
        const passwordLength = 12;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setGeneratedPassword(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: e.target.title.value,
            app_name: e.target.app_name.value,
            link: e.target.link.value,
            username: e.target.username.value,
            generated_password: e.target.generated_password.value
        };

        setTitle('');
        setAppName('');
        setLink('');
        setUsername('');
        setGeneratedPassword('');
        
        // Validation logic here
        const token = getTokenFromCookie('token');

        addPassword(formData, token)
            .then((result) => {
                toast.success('Password added successfully!');
                props.setUpdated(true);
                // Clear input fields
                // setTitle('');
                // setAppName('');
                // setLink('');
                // setUsername('');
                // setGeneratedPassword('');
                // Close the modal after adding the password
                props.onHide();
            })
            .catch(() => {
                toast.error('Failed to add password!');
            });
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                    </Form.Group>
                    <Form.Group controlId="app_name">
                        <Form.Label>App Name</Form.Label>
                        <Form.Control type="text" name="app_name" value={app_name} onChange={(e) => setAppName(e.target.value)} placeholder="App Name" />
                    </Form.Group>
                    <Form.Group controlId="link">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="text" name="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    </Form.Group>
                    <Form.Group controlId="generated_password">
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                            <Form.Control type="text" name="generated_password" value={generated_password} onChange={(e) => setGeneratedPassword(e.target.value)} placeholder="Password" />
                            <Button variant="secondary" onClick={generatePassword}>Generate</Button>
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPasswordModal;

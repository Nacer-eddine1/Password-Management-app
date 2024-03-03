import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { updatePassword } from '../../hooks/passwordsHook';
import { toast } from 'react-toastify';

const UpdatePasswordModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const passwordData = {
            title: formData.get('title'),
            appName: formData.get('appName'),
            link: formData.get('link'),
            username: formData.get('username'),
            generatedPassword: formData.get('generatedPassword')
        };
        
        // Validation logic here
    

        updatePassword(props.password.id, passwordData)
            .then((result) => {
                toast.success('Password updated successfully!');
                props.setUpdated(true);
                // Close the modal after updating the password
                props.onHide();
            })
            .catch(() => {
                alert('Failed to update password');
            });
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Update Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" defaultValue={props.password.title} placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="appName">
                        <Form.Label>App Name</Form.Label>
                        <Form.Control type="text" name="appName" defaultValue={props.password.app_name} placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="link">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="text" name="link" defaultValue={props.password.link} placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" defaultValue={props.password.username} placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="generatedPassword">
                        <Form.Label>Generated Password</Form.Label>
                        <Form.Control type="text" name="generatedPassword" defaultValue={props.password.generated_password} placeholder="" />
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

export default UpdatePasswordModal;

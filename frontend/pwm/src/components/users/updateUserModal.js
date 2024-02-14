import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateUser } from '../../hooks/usersHook';



const UpdateUserModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(props.user.id, e.target)
        .then((result)=>{
            alert(result);
            // props.setIsUpdated(true);
            props.setUpdated(true);
            props.onHide()
        },
        (error)=>{
            alert("Failed to Update User");
            console.log('error: ', error)
        })
    };

    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
                        Update User Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" required defaultValue={props.user.first_name} placeholder="" />
                            </Form.Group>

                            <Form.Group controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" required defaultValue={props.user.last_name} placeholder="" />
                            </Form.Group>
                            {/* <Form.Group controlId="RegistrationNo">
                                    <Form.Label>Registration No.</Form.Label>
                                    <Form.Control type="text" name="RegistrationNo" required defaultValue={props.user.RegistrationNo} placeholder="" />
                            </Form.Group> */}
                            <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" required defaultValue={props.user.email} placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" name="role" required defaultValue={props.user.role} placeholder="" />
                            </Form.Group>
                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateUserModal;
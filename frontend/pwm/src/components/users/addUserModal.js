import React, { useState } from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addUser } from '../../hooks/usersHook';
import { toast } from 'react-toastify';



const AddUserModal = (props) => {

    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_nameError, setFirst_NameError] = useState('');
    const [last_nameError, setLast_NameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
            // Reset errors
    setFirst_NameError('');
    setLast_NameError('');
    setEmailError('');
    setPasswordError('');

    // Validation
    const nameRegex = /^[a-zA-Z]{5,15}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Check if the user has entered first name field correctly
    if (!first_name.match(nameRegex)) {
      if (!first_name) {
        setFirst_NameError('Please enter your first name');
      } else if (first_name.length < 5 || first_name.length > 15) {
        setFirst_NameError('First name should be between 5 and 15 characters');
      } else if (!/^[a-zA-Z]+$/.test(first_name)) {
        setFirst_NameError('First name should contain only letters');
      }
      return;
    }

    // Check if the user has entered last name field correctly
    if (!last_name.match(nameRegex)) {
      if (!last_name) {
        setLast_NameError('Please enter your last name');
      } else if (last_name.length < 5 || last_name.length > 15) {
        setLast_NameError('Last name should be between 5 and 15 characters');
      } else if (!/^[a-zA-Z]+$/.test(last_name)) {
        setLast_NameError('Last name should contain only letters');
      }
      return;
    }

    // Check if the user has entered email field correctly
    if (!email.match(emailRegex)) {
      if (!email) {
        setEmailError('Please enter your email');
      } else {
        setEmailError('Please enter a valid email');
      }
      return;
    }

    // Check if the user has entered password field correctly
    if (!password.match(passwordRegex)) {
      if ("" === password) {
        setPasswordError("Please enter a password")
        return
      }
      if (password.length < 8) {
        setPasswordError('Password should be at least 8 characters long');
      }
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordError('Password should contain at least one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordError('Password should contain at least one uppercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        setPasswordError('Password should contain at least one number');
      }
      if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordError('Password should contain at least one special character');
      }
      return;
    }
        addUser(e.target)
        .then((result)=>{
            toast.success('Added successfully!');
            props.setUpdated(true);
            // Clear input fields
            setFirst_Name('');
            setLast_Name('');
            setEmail('');
            setPassword('');
            // Close the modal after adding the user
            props.onHide();
        },
        (error)=>{
          toast.error('Failed to Add User!');
        })
    }

    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
                        Fill In User Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="first_name" value={first_name} onChange={(e) => setFirst_Name(e.target.value)} placeholder="First Name"/>
                                    <Form.Label className="errorLabel">{first_nameError}</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" value={last_name} onChange={(e) => setLast_Name(e.target.value)} placeholder="Last Name"/>
                                    <Form.Label className="errorLabel">{last_nameError}</Form.Label>
                            </Form.Group>
                            {/* <Form.Group controlId="RegistrationNo">
                                    <Form.Label>Registration No.</Form.Label>
                                    <Form.Control type="text" name="RegistrationNo" required placeholder="" />
                            </Form.Group> */}
                            <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <Form.Label className="errorLabel">{emailError}</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    <label className="errorLabel">{passwordError}</label>
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

export default AddUserModal;
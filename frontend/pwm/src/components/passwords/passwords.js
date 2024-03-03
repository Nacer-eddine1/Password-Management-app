import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddPasswordModal from "./addPasswordModal";
import UpdatePasswordModal from "./updatePasswordModal";
import Header  from "../header/header" ;
import { getPasswords, deletePassword, getTokenFromCookie } from '../../hooks/passwordsHook';
// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';


const Passwords = () => {
    const [passwords, setPasswords] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editPassword, setEditPassword] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    // const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
      // const token = Cookies.get('token'); // Retrieve the token from cookies
      // console.log('token', token);
      const token = getTokenFromCookie('token');
      // console.log(token);
      let mounted = true;
      if(passwords.length && !isUpdated) {
        return;
      }
      getPasswords(token)
        .then(data => {
          if(mounted) {
            setPasswords(data);
          }
        })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, passwords])

    const handleUpdate = (e, pwd) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditPassword(pwd);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, passwordId) => {
        if(window.confirm('Are you sure?')){
            e.preventDefault();
            deletePassword(passwordId)
            .then(() => {
                alert("Password deleted successfully.");
                setIsUpdated(true);
                setPasswords(passwords.filter(password => password.id !== passwordId));
            })
            .catch(() => {
                alert("Failed to delete password.");
            });
        }
    };

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    return (
        <>
            <Header />
        <div className="container center-container">
                <h1 className="mb-5">Passwords</h1>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Title</th>
                                    <th>App Name</th>
                                    <th>Link</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords.map((pwd) => <tr key={pwd.id}>
                                    {/* <td>{pwd.id}</td> */}
                                    <td>{pwd.title}</td>
                                    <td>{pwd.app_name}</td>
                                    <td>{pwd.link}</td>
                                    <td>{pwd.username}</td>
                                    <td>{pwd.generated_password}</td>
                                    <td>
                                        <Button className="mr-2" variant="danger" onClick={event => handleDelete(event, pwd.id)}>
                                            <RiDeleteBin5Line />
                                        </Button>
                                        <span>&nbsp;&nbsp;&nbsp;</span>
                                        <Button className="mr-2" onClick={event => handleUpdate(event, pwd)}>
                                            <FaEdit />
                                        </Button>
                                        <UpdatePasswordModal show={editModalShow} password={editPassword} setUpdated={setIsUpdated} onHide={EditModelClose}></UpdatePasswordModal>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </Table>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={handleAdd}>Add Password</Button>
                            <AddPasswordModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModelClose}></AddPasswordModal>
                        </ButtonToolbar>
                    </div>
                </div>
            </div></>
    );
};

export default Passwords;

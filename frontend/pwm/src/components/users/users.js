import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddUserModal from "./addUserModal";
import UpdateUserModal from "./updateUserModal";
import { getUsers, deleteUser } from '../../hooks/usersHook';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editUser, setEditUser] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
       let mounted = true;
       if(users.length && !isUpdated) {
        return;
        }
       getUsers()
         .then(data => {
           if(mounted) {
             setUsers(data);
             console.log(users);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, users])

    const handleUpdate = (e, usr) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditUser(usr);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, userId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteUser(userId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                setUsers(users.filter(user => user.id !== userId));
            },
            (error)=>{
                alert("Failed to Delete User");
            })
        }
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
      <div className="container center-container">
      <h1 className="mb-5"></h1>
      <div className="row justify-content-center">
          <div className="col-lg-10">
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                  <th >ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  {/* <th>Registration No</th> */}
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  { users.map((usr) =>

                  <tr key={usr.id}>
                  <td>{usr.id}</td>
                  <td>{usr.first_name}</td>
                  <td>{usr.last_name}</td>
                  {/* <td>{usr.RegistrationNo}</td> */}
                  <td>{usr.email}</td>
                  <td>{usr.role}</td>
                  <td>

                  <Button className="mr-2" variant="danger"
                    onClick={event => handleDelete(event,usr.id)}>
                        <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2"
                    onClick={event => handleUpdate(event,usr)}>
                        <FaEdit />
                  </Button>
                  <UpdateUserModal show={editModalShow} user={editUser} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateUserModal>
                </td>
                </tr>)}
              </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add User
                </Button>
                <AddUserModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddUserModal>
            </ButtonToolbar>
            </div>
          </div>
        </div>
    );
};

export default Users;


// import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
// import { getUsers } from '../../hooks/usersHook';
// import "../App.css";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//    let mounted = true;
//    getUsers()
//      .then(data => {
//        if(mounted) {
//          setUsers(data)
//        }
//      })
//    return () => mounted = false;
//  }, [])

//   return(
//    <div className="container-fluid side-container">
//    <div className="row side-row" >
//     <p id="before-table"></p>
//         <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
//         <thead>
//             <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             </tr>
//         </thead>
//         <tbody>
//             {users.map((usr) =>
//             <tr key={usr.id}>
//                 <td>{usr.userId}</td>
//                 <td>{usr.first_name}</td>
//                 <td>{usr.last_name}</td>
//                 <td>{usr.Email}</td>
//                 <td>{usr.role}</td>
//             </tr>)}
//         </tbody>
//     </Table>
//     </div>
//   </div>
//   );
// };

// export default Users;
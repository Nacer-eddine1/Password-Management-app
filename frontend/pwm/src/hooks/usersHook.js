import axios from 'axios';

export async function getUsers() {
  const response = await axios.get('http://localhost:8000/api/users');
    return response.data;
}

export async function deleteUser(userId) {
  const response = await axios.delete('http://localhost:8000/api/users/' + userId + '/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export async function addUser(user){
  const response = await axios.post('http://localhost:8000/api/users', {
        userId: null,
        first_name: user.first_name.value,
        last_name: user.last_name.value,
        // RegistrationNo:user.RegistrationNo.value,
        email: user.email.value,
        password: user.password.value,
    });
    return response.data;
}

export async function updateUser(usrid, user) {
  const response = await axios.put('http://localhost:8000/api/users/' + usrid + '/', {
        first_name: user.first_name.value,
        last_name: user.last_name.value,
        // RegistrationNo:user.RegistrationNo.value,
        email: user.email.value,
        role: user.role.value
    });
    return response.data;
}
import axios from 'axios';

export async function getPasswords(token) {
  const response = await axios.get('http://localhost:8000/api/passwords/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export async function deletePassword(passwordId) {
  const response = await axios.delete(`http://localhost:8000/api/passwords/delete/${passwordId}/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export async function addPassword(formData, token) {
  try {
      const response = await axios.post('http://localhost:8000/api/passwords/create/', {
          title: formData.title,
          app_name: formData.app_name,
          link: formData.link,
          username: formData.username,
          generated_password: formData.generated_password
      }, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
}

export async function updatePassword(passwordId, passwordData) {
  const response = await axios.put(`http://localhost:8000/api/passwords/update/${passwordId}/`, {
    title : passwordData.title,
    app_name : passwordData.appName,
    link : passwordData.link,
    username : passwordData.username,
    generated_password : passwordData.generatedPassword
  });
  return response.data;
}


export function getTokenFromCookie(cookieName) {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null; // Return null if token is not found
}

const BASE_URL = "http://localhost:8000/api"

export async function getAllPosts() {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Cannot get products');
    }
  }

export async function logInUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(result => result.json());
    console.log(response)

    return response
  } catch(e) {
    throw e;
  }
}

export const isUser = async (token) => {
  try {
      const resp = await fetch(`${BASE_URL}/users/me`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });
      const data = await resp.json();

      console.log(data)
      if (data.username) {
          return {
              id: data.id,
              username: data.username,
              isAdmin: data.isAdmin
          };
      }
      return false;
  } catch (error) {
      console.error(error);
  }
};
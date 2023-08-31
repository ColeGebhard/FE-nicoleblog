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

export async function createPost({
  title,
  body,
  image,
  date_created,
  userId
}) {
  console.log(date_created)
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        image,
        date_created,
        userId
      })
    });
    const data = await response.json();

    console.log(data.date_created)


    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to make post.');
  }
}

export async function subscribeEmail({email}) {
  try {
    const response = await fetch(`${BASE_URL}/posts/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      })
    });
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to make post.');
  }
}

export async function getAllCategories() {
  try {
      const response = await fetch(`${BASE_URL}/categories`, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);

      return data;
  } catch (error) {
      console.error("Error while fetching categories:", error);
      throw error; // Re-throw the error to be handled by the caller
  }
}
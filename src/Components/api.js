// const BASE_URL = "http://localhost:8000/api"
const BASE_URL = "https://auborn-activist.onrender.com/api"

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
    throw new Error('Cannot get products');
  }
}

export async function logInUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(result => result.json());

    return response
  } catch (e) {
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
    throw error
  }
};

export async function createPost({
  title,
  body,
  image,
  date_created,
  userId,
  categoryId,
  isHeadline,
}) {
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
        userId,
        categoryId,
        isHeadline, 
      })
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('Failed to make post.');
  }
}


export async function subscribeEmail({ email }) {
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

    return data;
  } catch (error) {
    throw new Error('Failed to make post.', error);
  }
}

export async function unsubscribeEmail({ email }) {
  try {
    const response = await fetch(`${BASE_URL}/posts/unsubscribe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      })
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('Failed to make post.', error);
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


    return data;
  } catch (error) {
    throw new Error("Could not get categories", error); 
  }
}

export async function getCategoryById(id) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();


    return data;
  } catch (e){
    throw new Error('Failed to get category by id')
  }
}

//Get posts by CateogryID
export async function getPostsByCategoryId(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/category/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (e){
    throw new Error('Failed to get posts by id')
  }
}

export async function updatePost(updatedPostData, token) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${updatedPostData.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: updatedPostData.title,
        body: updatedPostData.body,
        image: updatedPostData.image,
        categoryId: updatedPostData.categoryId,
        isHeadline: updatedPostData.isHeadline,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update post.');
    }


    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to update post.');
  }
}

export async function deletePost(postId, token) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete post.');
    }


    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to delete post.');
  }
}
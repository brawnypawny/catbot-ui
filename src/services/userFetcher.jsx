const backend_url = import.meta.env.VITE_BACKEND_URL;

export async function registerUser(username, password) {
  const mutation = `
    mutation Register($registerUserInput: RegisterUserDto!) {
      registerUser(registerUserInput: $registerUserInput)
    }
  `;

  const variables = {
    registerUserInput: {
      username,
      password,
    },
  };

  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await res.json();

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  return result.data.registerUser;
}


export async function loginUser(username, password) {
  const query = `
    mutation Login($signInUserDto: SignInDto!) {
    login(signInUserDto: $signInUserDto)
    }
  `;

  const variables = {
    signInUserDto: {  
      username,
      password,
    },
  };

  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await res.json();

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  return result.data.login;
}


export async function deleteCat(id) {
  const query = `
    mutation DeleteCat($id: String!) {
      removeCat(id: $id)
    }
  `;

  const variables = { id };

  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await res.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.removeCat; // string   "Cat with ID xyz deleted."
}
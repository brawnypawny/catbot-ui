const backend_url = 'http://localhost:3000/graphql'; 


export async function getCats() {
  const query = `
    query {
      cats {
        id
        name
        age
        breed
      }
    }
    `
  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ query }),
  });


 if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  if (result.errors && result.errors.length > 0) {
    // Log or handle GraphQL errors better + properly
    console.error('GraphQL errors:', result.errors);
    throw new Error(result.errors[0].message);
  }

  if (!result.data || !result.data.cats) {
    throw new Error('No cats data returned');
  }

  return result.data.cats;
}



export async function addCat(cat) {
  if (!cat.name || !cat.age) {
    throw new Error('Name and age are required');
  }

  const token = localStorage.getItem('token');

  const mutation = `
    mutation createCat($createCatDto: CreateCatDto!) {
      createCat(CreateCatDto: $createCatDto) {
        id
        name
        age
        breed
      }
    }
  `;


  const variables = {
    createCatDto: {
      name: cat.name,
      age: parseInt(cat.age), // force age to be a number
      breed: cat.breed || '', // default to empty string if no breed
    }
  }

  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await res.json();

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  return result.data.createCat;
}





export async function deleteCat(id) {
  const mutation = `
    mutation DeleteCat($id: String!) {
      deleteCat(id: $id)
    }
  `;

  const variables = { id };

  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // auth header
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await res.json();

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors[0].message);
  }

  return result.data.deleteCat; // expect confirmation message
}
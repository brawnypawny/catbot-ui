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
    `
  const res = await fetch(backend_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error('Failed to fetch cats');
  const result = await res.json();
  return result.data.cats;

}

export async function addCat(cat) {
  if (!cat.name || !cat.age) {
    throw new Error('Name and age are required');
  }
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
    breed: cat.breed || '', // Default to empty string if no breed 
  }
}

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

  return result.data.createCat;
}
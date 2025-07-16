import React, { useEffect, useState } from 'react';

export default function CatList() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCats() {
      try {
        const res = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query {
                cats {
                  id
                  name
                  age
                  breed
                }
              }
            `
          })
        });

        const data = await res.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        setCats(data.data.cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCats();
  }, []);

  if (loading) return <p>Loading cats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Cat Database</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Breed</th>
          </tr>
        </thead>
        <tbody>
          {cats.map(cat => (
            <tr key={cat.id}>
              <td style={styles.td}>{cat.name}</td>
              <td style={styles.td}>{cat.age}</td>
              <td style={styles.td}>{cat.breed || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  th: {
    border: '1px solid #ccc',
    padding: '0.5rem',
    backgroundColor: '#f5f5f5',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ccc',
    padding: '0.5rem',
  },
};

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCats } from '../services/catFetcher'; 
import './CatList.css'; 

export default function CatList() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    getCats()
      .then(data => setCats(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;




//tailwind styling for the table list, no custom css
  return (
    <div className="cat-table-wrapper">
      <table className="cat-table">
        <thead>
          <tr>
            <th>Cat</th>
            <th>Age</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => (
            <tr key={cat.id}>
              <td>
                <span className="bubble cat-name">{cat.name}</span>
              </td>
              <td>
                <span className="bubble cat-age">{cat.age}</span>
              </td>
              <td>
                <span className="bubble cat-breed">{cat.breed}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCats, deleteCat } from '../services/catFetcher'; 
import './CatList.css'; 


//cat images
import demonCat from '../assets/demon_cat.png';
import fortuneTellerCat from '../assets/fortune_teller_cat.png';
import volcanoCat from '../assets/volcano_cat.png';
import turtleCat from '../assets/turtle_cat.png';
import poopCat from '../assets/poop_cat.png';
import barfCat from '../assets/barf_cat.png';
import clownCat from '../assets/clown_cat.png';
import phaatCat from '../assets/phaat_cat.png';
import defaultCat from '../assets/catbot.png';


const breedToImage = {
  red: clownCat,
  purple: demonCat,
  blue: fortuneTellerCat,
  orange: volcanoCat,
  green: turtleCat,
  brown: poopCat,
  rainbow: barfCat,
  yellow: phaatCat
};


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



  const handleDelete = async (id) => {
    try {
      await deleteCat(id); //GraphQL mutation to catFetcher
      setCats(prev => prev.filter(cat => cat.id !== id)); // updates UI
    } catch (err) {
      alert("Failed to delete cat: " + err.message);
    }
  };

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
                <img
                  src={breedToImage[cat.breed] || defaultCat}
                  alt={`${cat.breed} cat`}
                  style={{ width: '50px', borderRadius: '8px' }}
                />
              </td>


              {/*various buttons!*/}
              <td>
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-xl transition"
                onClick={() => handleDelete(cat.id)}
              >
                Delete
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
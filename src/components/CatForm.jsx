import { useState } from 'react';
import { addCat } from '../services/catFetcher';
import './CatForm.css'; 

export default function CatForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    try {
      const newCat = await addCat({ name, age, breed });
      setSuccess(`Cat "${newCat.name}" added successfully!`);
      setName('');
      setAge('');
      setBreed('');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (

 /* css classes for styling */
<div>
  <form className="cat-form" onSubmit={handleSubmit}>
    <label>
      Name:
      <input
        type="text"
        placeholder="Cat Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </label>

    <label>
      Age:
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        min="0"
      />
    </label>

    <label>
      Breed:
      <select
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        required
      >
        <option value="">Select a color</option>
        <option value="red">Red Cat</option>
        <option value="orange">Orange Cat</option>
        <option value="yellow">Yellow Cat</option>
        <option value="green">Green Cat</option>
        <option value="blue">Blue Cat</option>
        <option value="purple">Purple Cat</option>
        <option value="brown">Brown Cat</option>
        <option value="rainbow">Rainbow Cat</option>
      </select>
    </label>

    <button type="submit">Add Cat</button>

    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && <p style={{ color: 'green' }}>{success}</p>}
  </form>
</div>

  );   
}
import { useState } from 'react';
import { addCat } from '../services/catFetcher';

export default function CatForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent browser reload
    if (!name || !age) return alert("Please fill all fields");

    try{
      await addCat({ name, age, breed });
      alert('Cat added!');
      setName('');
      setAge('');
      setBreed('');
    } catch (e) {
      console.error('Error adding cat:', e);
      alert('Failed to add cat');
    }
   

   
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md p-4 border rounded">
      <input
        type="text"
        placeholder="Cat name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />
    <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Cat
      </button>
    </form>
  );
}

import React from 'react';
import CatForm from '../components/CatForm'; // Adjust path

export default function AddCat() {
  return (
    <div className="page-center">
      <h1>Add a New Cat</h1>
      <CatForm />
    </div>
  );
}
//job: layout the overall structure of a full page


import React from 'react';
import CatList from '../components/CatList';

export default function CatDatabase() {
  return (
    <div className="page-center">
      <h1>Cat Database</h1>
      <CatList />
    </div>
  );
}

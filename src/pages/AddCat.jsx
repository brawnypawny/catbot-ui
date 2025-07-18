import CatForm from '../components/CatForm';

export default function AddCat() {
  return (
    <div className="page-center">
      <h1 style={{ fontFamily: 'Arial, serif', color: '#ec225c' }}> {/*header lookin kinda tacky fix later*/ }
        Add a New Cat
      </h1>
      <CatForm />
    </div>
  );
}

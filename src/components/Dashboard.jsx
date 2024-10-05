import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const goToNewPlant = () => {
    navigate('/agregar');
  };

  const goToCreateGarden = () => {
    navigate('/crear-nuevo-huerto');
  };

  const goToModifyGarden = () => {
    navigate('/modificar-huerto');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <div className="d-flex flex-column align-items-center mt-4">
        <button className="btn btn-primary mb-3 w-50" onClick={goToNewPlant}>
          Ingresar nueva planta
        </button>
        <button className="btn btn-success mb-3 w-50" onClick={goToCreateGarden}>
          Crear nuevo huerto
        </button>
        <button className="btn btn-warning mb-3 w-50" onClick={goToModifyGarden}>
          Modificar huerto
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

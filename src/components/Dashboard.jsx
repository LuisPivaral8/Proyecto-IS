import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Archivo CSS separado

const Dashboard = () => {
  const navigate = useNavigate();

  const goToNewPlant = () => {
    navigate('/agregar');
  };

  const goToCreateGarden = () => {
    navigate('/crear-nuevo-huerto');
  };

  const goToModifyGarden = () => {
    navigate('/modificar');
  };

  const goToEnyclopedia = () => {
    navigate('/enciclopedia');
  };

  const goToEditProfile = () => {
    navigate('/editprofile');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="dashboard-btn btn-new-plant" onClick={goToNewPlant}>
            <img src="planta1.png" alt="Ingresar nueva planta" className="dashboard-icon" />
            <span>Ingresar nueva planta</span>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-btn btn-create-garden" onClick={goToCreateGarden}>
            <img src="planta3.png" alt="Crear nuevo huerto" className="dashboard-icon" />
            <span>Crear nuevo huerto</span>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-btn btn-modify-garden" onClick={goToModifyGarden}>
            <img src="planta2.png" alt="Modificar huerto" className="dashboard-icon" />
            <span>Modificar huerto - Ver mis plantas</span>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-btn btn-encyclopedia" onClick={goToEnyclopedia}>
            <img src="enciclopedia.png" alt="Enciclopedia" className="dashboard-icon" />
            <span>Enciclopedia</span>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="dashboard-btn btn-encyclopedia" onClick={goToEditProfile}>
            <img src="perfiledit.png" alt="Enciclopedia" className="dashboard-icon" />
            <span>Perfil</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

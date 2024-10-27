import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const response = await axios.get('http://localhost/API/verificar_sesion.php', { withCredentials: true });
        console.log(response.data)
        console.log(response.data.sesion_activa)
        if (!response.data.sesion_activa) {
          navigate('/'); // Redirige a la raíz si no hay sesión activa
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        navigate('/');
      }
    };

    verificarSesion();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost/API/logout.php', { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const goToNewPlant = () => navigate('/agregar');
  const goToCreateGarden = () => navigate('/crear-nuevo-huerto');
  const goToModifyGarden = () => navigate('/modificar');
  const goToEnyclopedia = () => navigate('/enciclopedia');
  const goToEditProfile = () => navigate('/modify');

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-danger mb-4">Cerrar Sesión</button>
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

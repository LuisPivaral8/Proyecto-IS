import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModifyProfile = () => {
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
    const [newUsername, setNewUsername] = useState(localStorage.getItem('username') || '');
    const [newPassword, setNewPassword] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Obtenemos el username y userId de la sesión (puedes ajustar según tu fuente de datos)
        const userIdFromSession = localStorage.getItem('user_id');
        const usernameFromSession = localStorage.getItem('username');
        console.log(localStorage);
        console.log(userIdFromSession);
        console.log(usernameFromSession);
        if (userIdFromSession && usernameFromSession) {
            setUserId(userIdFromSession);
            setNewUsername(usernameFromSession);
        }
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/API/updateProfile.php", {
                userId,
                username: newUsername,
                password: newPassword,
            }, { withCredentials: true });
            if (response.data.success) {
                alert("Perfil actualizado exitosamente");
                localStorage.setItem('username', newUsername); // Actualizar username en almacenamiento local
                navigate('/Dashboard');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Modificar Perfil</h2>
            <form onSubmit={handleUpdate} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="newUsername" className="form-label">Nuevo Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newUsername"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Actualizar</button>
                <button onClick={() => navigate('/Dashboard')} className="btn btn-secondary mt-3 w-100">Cancelar</button>
            </form>
        </div>
    );
};

export default ModifyProfile;

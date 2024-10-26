import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModifyProfile = () => {
    const location = useLocation();
    const { username, userId } = location.state || {}; // Obtener el username y userId del estado
    const [newUsername, setNewUsername] = useState(username);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const goinit = () => {navigate('/Dashboard')}
    const handleReturn = () => {navigate('/editprofile')}

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/API/updateProfile.php", {
                userId,
                username: newUsername,
                password: newPassword,
            });
            if (response.data.success) {
                alert("Perfil actualizado exitosamente");
                goinit();
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
                <button onClick={handleReturn} className="btn btn-secondary mt-3 w-100">cancelar</button>
            </form>
        </div>
    );
};

export default ModifyProfile;

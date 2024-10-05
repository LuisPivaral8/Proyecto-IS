import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/API/sign.php", {
                username,
                password,
            });
            if (response.data.message) {
                // Manejar éxito o redirigir
                navigate('/');
                alert("Creado con éxito");
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Crear Cuenta</h2>
            <form onSubmit={handleSignup} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Correo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Crear Cuenta</button>
                <button onClick={() => navigate('/')} className="btn btn-danger w-100 mt-3">Cancelar</button>
            </form>
        </div>
    );
};

export default SignupForm;

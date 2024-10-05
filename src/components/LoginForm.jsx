import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/API/login.php", {
                username,
                password,
            });
            if (response.data.success) {
                // Redirigir a la página de dashboard
                navigate('/Dashboard');
            } else {
                // Manejar error de inicio de sesión
                alert("Credenciales incorrectas")
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="w-50 mx-auto">
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
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                <button onClick={() => navigate("/Signup")} type="submit" className="btn btn-primary w-100 mt-3">Sign up</button>
            </form>
        </div>
    );
};

export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AgregarPlanta = () => {
    // Estados para los campos del formulario
    const [nombreComun, setNombreComun] = useState('');
    const [nombreCientifico, setNombreCientifico] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const navigate = useNavigate();

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar la información al servidor
            const response = await axios.post("http://localhost/API/agregarPlanta.php", {
                nombre_comun: nombreComun,
                nombre_cientifico: nombreCientifico,
                descripcion: descripcion,
                fecha_creacion: fechaCreacion,
            });

            // Comprobar la respuesta del servidor
            if (response.data.success) {
                alert('Planta agregada exitosamente');
                // Limpiar el formulario
                setNombreComun('');
                setNombreCientifico('');
                setDescripcion('');
                setFechaCreacion('');
            } else {
                alert('Error al agregar la planta');
            }
        } catch (error) {
            console.error("Error al agregar la planta:", error);
            alert('Ocurrió un error al intentar agregar la planta');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Agregar Nueva Planta</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="nombre_comun" className="form-label">Nombre Común</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre_comun"
                        value={nombreComun}
                        onChange={(e) => setNombreComun(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre_cientifico" className="form-label">Nombre Científico</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre_cientifico"
                        value={nombreCientifico}
                        onChange={(e) => setNombreCientifico(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha_creacion" className="form-label">Fecha de Creación</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_creacion"
                        value={fechaCreacion}
                        onChange={(e) => setFechaCreacion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Agregar Planta</button>
                <button onClick={() => navigate('/Dashboard')} type="submit" className="btn btn-secondary w-100 mt-3">Cancelar</button>
            </form>
        </div>
    );
};

export default AgregarPlanta;

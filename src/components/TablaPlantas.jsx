import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const TablaPlantas = () => {
    const [plantas, setPlantas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlanta, setSelectedPlanta] = useState(null);
    const [nombreComun, setnombreComun] = useState('');
    const [nombreCientifico, setnombreCientifico] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate('');

    const handlereturn = () => {navigate('/Dashboard')}

    const fetchPlantas = async () => {
        try {
            const response = await axios.get('http://localhost/API/obtenerPlantas.php');
            if (response.data && response.data.data) {
                setPlantas(response.data.data);
                console.log(response.data);
            } else {
                setError('No se encontraron plantas');
            }
        } catch (err) {
            console.error('Error al cargar las plantas:', err);
            setError('Error al cargar las plantas');
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta planta?')) {
            try {
                const response = await axios.delete(`http://localhost/API/eliminarPlanta.php?id=${id}`);
                if (response.data.success) {
                    alert('Planta eliminada con éxito');
                    fetchPlantas(); // Recarga las plantas
                } else {
                    alert('Error al eliminar la planta');
                }
            } catch (err) {
                console.error('Error al eliminar la planta:', err);
                alert('Error al eliminar la planta');
            }
        }
    };

    const handleModificar = async (id) => {
        const updatedPlanta = {
            id: id,
            nombre_comun: nombreComun,
            nombre_cientifico: nombreCientifico,
            description: description,
        };
        console.log(updatedPlanta)
    
        try {
            const response = await axios.put(
                'http://localhost/API/modificarPlanta.php',
                updatedPlanta, // Cuerpo de la solicitud
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                alert('Planta modificada con éxito');
                setSelectedPlanta(null);
                fetchPlantas(); // Recarga las plantas
            } else {
                alert('Error al modificar la planta');
            }
        } catch (err) {
            console.error('Error al modificar la planta:', err);
            alert('Error al modificar la planta');
        }
    };
    

    useEffect(() => {
        fetchPlantas();
    }, []);

    if (loading) return <p>Cargando plantas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tabla-container">
            <h2 className="text-center">Lista de Plantas</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre Común</th>
                        <th>Nombre Científico</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {plantas.length > 0 ? (
                        plantas.map((planta) => (
                            <tr key={planta.id}>
                                <td>{planta.id}</td>
                                <td>{planta.nombre_comun}</td>
                                <td>{planta.nombre_cientifico}</td>
                                <td>{planta.description}</td>
                                <td>
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={() => {
                                            setSelectedPlanta(planta);
                                            setnombreComun(planta.nombre_comun);
                                            setnombreCientifico(planta.nombre_cientifico);
                                            setDescription(planta.description);
                                        }}>
                                        Modificar
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleEliminar(planta.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay plantas disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedPlanta && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modificar Planta</h5>
                                <button type="button" className="close" onClick={() => setSelectedPlanta(null)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre Común</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={nombreComun} 
                                        onChange={(e) => setnombreComun(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nombre Científico</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={nombreCientifico} 
                                        onChange={(e) => setnombreCientifico(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea 
                                        className="form-control" 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedPlanta(null)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleModificar(selectedPlanta.id)}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <center><button onClick={handlereturn} className='btn btn-secondary'>Regresar</button></center>
        </div>
    );
};

export default TablaPlantas;

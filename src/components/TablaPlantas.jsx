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
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el filtro
    const navigate = useNavigate('');

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
    

    const handlereturn = () => { navigate('/Dashboard') }

    

    const fetchPlantas = async () => {
        try {
            const response = await axios.get('http://localhost/API/obtenerPlantas.php', { withCredentials: true });
            if (response.data && response.data.data) {
                console.log(response.data)
                setPlantas(response.data.data);
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
                const response = await axios.delete(`http://localhost/API/eliminarPlanta.php?id=${id}`, { withCredentials: true });
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
            descripcion: description,
        };

        try {
            const response = await axios.put(
                'http://localhost/API/modificarPlanta.php',
                updatedPlanta, { withCredentials: true }, // Cuerpo de la solicitud
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

    // Filtrar plantas según el término de búsqueda
    const filteredPlantas = plantas.filter(planta =>
        planta.nombre_comun.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="tabla-container">
            <h2 className="text-center">Lista de Plantas</h2>
            <input
                type="text"
                placeholder="Buscar por nombre común..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="row">
                {filteredPlantas.length > 0 ? (
                    filteredPlantas.map((planta) => (
                        <div className="col-md-4 mb-4" key={planta.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{planta.nombre_comun}</h5>
                                    <p className="card-text">{planta.descripcion}</p>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => {
                                            setSelectedPlanta(planta);
                                            setnombreComun(planta.nombre_comun);
                                            setDescription(planta.descripcion);
                                        }}>
                                        Modificar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminar(planta.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No hay plantas disponibles</p>
                    </div>
                )}
            </div>

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

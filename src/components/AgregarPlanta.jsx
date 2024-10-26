import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchPlantas = async () => {
    const response = await axios.get('http://localhost:5000/api/plants');
    return response.data.data;
};

const AgregarPlanta = () => {
    const [plantaSeleccionada, setPlantaSeleccionada] = useState('');
    const [plantaInfo, setPlantaInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mostrarFormularioManual, setMostrarFormularioManual] = useState(false);
    const [plantaManual, setPlantaManual] = useState({
        nombre_comun: '',
        nombre_cientifico: '',
        descripcion: ''
    });

    
    

    const { data: plantas = [], error, isLoading } = useQuery({
        queryKey: ['plantas'],
        queryFn: fetchPlantas,
    });

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
    
    const handlereturn = () => navigate('/Dashboard');

    const manejarCambio = (event) => {
        const idPlanta = event.target.value;
        setPlantaSeleccionada(idPlanta);
        const plantaSeleccionada = plantas.find(planta => planta.id === parseInt(idPlanta));
        setPlantaInfo(plantaSeleccionada);
    };

    const manejarEnvio = async (event) => {
        event.preventDefault();

        // Crear objeto de datos de la planta
        const plantaData = mostrarFormularioManual ? plantaManual : {
            nombre_comun: plantaInfo.common_name,
            nombre_cientifico: plantaInfo.scientific_name,
            descripcion: plantaInfo.description,
        };
    
        if (!plantaData.nombre_comun || !plantaData.nombre_cientifico || isSubmitting) return;
    
        setIsSubmitting(true);
    
        try {
            // Enviar datos de la planta al backend para añadirla con el user_id de la sesión
            await axios.post('http://localhost/API/agregarPlanta.php', plantaData, { withCredentials: true }); // Asegúrate de incluir withCredentials
            alert('Planta agregada correctamente');
            setPlantaSeleccionada('');
            setPlantaInfo(null);
            setMostrarFormularioManual(false);
            setPlantaManual({ nombre_comun: '', nombre_cientifico: '', descripcion: '' });
        } catch (error) {
            console.error('Error al guardar la planta:', error);
            alert('Error al agregar la planta');
        } finally {
            setIsSubmitting(false);
        }
    };

    const manejarCambioFormularioManual = (event) => {
        const { name, value } = event.target;
        setPlantaManual({ ...plantaManual, [name]: value });
    };

    if (isLoading) return <p>Cargando plantas...</p>;
    if (error) return <p>Error al buscar las plantas: {error.message}</p>;

    return (
        <div className="form-container">
            <h2>Agregar Planta</h2>
            <button onClick={() => setMostrarFormularioManual(!mostrarFormularioManual)} className="form-button">
                {mostrarFormularioManual ? 'Cancelar Agregar Manualmente' : 'Agregar Planta Manualmente'}
            </button>

            {mostrarFormularioManual ? (
                <form onSubmit={manejarEnvio} className="form-content">
                    <label className="form-label">Nombre Común:</label>
                    <input
                        type="text"
                        name="nombre_comun"
                        value={plantaManual.nombre_comun}
                        onChange={manejarCambioFormularioManual}
                        className="form-input"
                        required
                    />
                    <label className="form-label">Nombre Científico:</label>
                    <input
                        type="text"
                        name="nombre_cientifico"
                        value={plantaManual.nombre_cientifico}
                        onChange={manejarCambioFormularioManual}
                        className="form-input"
                        required
                    />
                    <label className="form-label">Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={plantaManual.descripcion}
                        onChange={manejarCambioFormularioManual}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="form-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Agregar Planta'}
                    </button>
                </form>
            ) : (
                <form onSubmit={manejarEnvio} className="form-content">
                    <label htmlFor="plantas" className="form-label">Selecciona una planta:</label>
                    <select
                        id="plantas"
                        value={plantaSeleccionada}
                        onChange={manejarCambio}
                        className="form-select"
                    >
                        <option value="">Seleccione una planta</option>
                        {plantas.map((planta) => (
                            <option key={planta.id} value={planta.id}>
                                {planta.common_name || planta.scientific_name}
                            </option>
                        ))}
                    </select>

                    {plantaInfo && (
                        <div className="planta-info">
                            <h3>Información de la Planta:</h3>
                            <p><strong>Nombre Común:</strong> {plantaInfo.common_name}</p>
                            <p><strong>Nombre Científico:</strong> {plantaInfo.scientific_name}</p>
                        </div>
                    )}

                    <button type="submit" className="form-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Agregar Planta'}
                    </button>
                </form>
            )}

            <button style={{ background: 'red' }} onClick={handlereturn} className="form-button mt-3">
                Cancelar
            </button>
        </div>
    );
};

export default AgregarPlanta;

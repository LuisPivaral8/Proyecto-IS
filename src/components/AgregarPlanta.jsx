import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchPlantas = async () => {
    const response = await axios.get(`http://localhost:5000/api/plants`);
    return response.data.data;
};

const AgregarPlanta = () => {
    const [plantaSeleccionada, setPlantaSeleccionada] = useState('');
    const [plantaInfo, setPlantaInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar envío

    const { data: plantas = [], error, isLoading } = useQuery({
        queryKey: ['plantas'],
        queryFn: fetchPlantas,
    });

    const navigate = useNavigate();
    const handlereturn = () => navigate('/Dashboard');

    const manejarCambio = (event) => {
        const idPlanta = event.target.value;
        setPlantaSeleccionada(idPlanta);
        const plantaSeleccionada = plantas.find(planta => planta.id === parseInt(idPlanta));
        setPlantaInfo(plantaSeleccionada);
    };

    const manejarEnvio = async (event) => {
        event.preventDefault();
        if (!plantaInfo || isSubmitting) return; // Previene duplicación en envíos
        
        setIsSubmitting(true); // Bloquea nuevos envíos

        const plantaData = {
            nombre_comun: plantaInfo.common_name,
            nombre_cientifico: plantaInfo.scientific_name,
            descripcion: plantaInfo.description,

        };

        try {
            await axios.post('http://localhost/API/agregarPlanta.php', plantaData);
            alert('Planta agregada correctamente');
            setPlantaSeleccionada('');
            setPlantaInfo(null);
        } catch (error) {
            console.error('Error al guardar la planta:', error);
            alert('Error al agregar la planta');
        } finally {
            setIsSubmitting(false); // Permite envío después del error o éxito
        }
    };

    if (isLoading) return <p>Cargando plantas...</p>;
    if (error) return <p>Error al buscar las plantas: {error.message}</p>;

    return (
        <div className="form-container">
            <h2>Agregar Planta</h2>
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
                <button style={{ background: 'red' }} onClick={handlereturn} className="form-button mt-3">
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default AgregarPlanta;

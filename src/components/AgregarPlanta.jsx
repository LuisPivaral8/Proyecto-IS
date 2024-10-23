import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
//import './AgregarPlanta.css'; // Importa el archivo CSS

// Función para obtener las plantas
const fetchPlantas = async () => {
    const response = await axios.get(`http://localhost:5000/api/plants`);
    return response.data.data; // Devuelve la lista de plantas
};

const AgregarPlanta = () => {
    const [plantaSeleccionada, setPlantaSeleccionada] = useState('');
    const [plantaInfo, setPlantaInfo] = useState(null); // Para almacenar la información de la planta seleccionada

    // Usar useQuery para obtener las plantas
    const { data: plantas = [], error, isLoading } = useQuery({
        queryKey: ['plantas'], // Clave de la consulta
        queryFn: fetchPlantas, // Función que realiza la consulta
    });

    // Función para manejar el cambio de selección en el select
    const manejarCambio = (event) => {
        const idPlanta = event.target.value;
        setPlantaSeleccionada(idPlanta);
    
        const plantaSeleccionada = plantas.find(planta => planta.id === parseInt(idPlanta));
        setPlantaInfo(plantaSeleccionada); // Establece la información de la planta seleccionada
    };

    const manejarEnvio = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
    
        if (!plantaInfo) return; // Asegúrate de que hay una planta seleccionada
    
        const plantaData = {
            common_name: plantaInfo.common_name,
            scientific_name: plantaInfo.scientific_name,
            description: plantaInfo.description,
            created_at: new Date().toISOString(), // Agrega la fecha de creación
        };
    
        try {
            await axios.post('http://localhost/API/agregarPlanta.php', plantaData); // Asegúrate de tener esta ruta en tu servidor
            alert('Planta agregada correctamente'); // Mensaje de éxito
            setPlantaSeleccionada(''); // Reinicia la selección
            setPlantaInfo(null); // Reinicia la información de la planta
        } catch (error) {
            console.error('Error al guardar la planta:', error);
            alert('Error al agregar la planta');
        }
    };
    
    if (isLoading) return <p>Cargando plantas...</p>; // Mensaje de carga
    if (error) return <p>Error al buscar las plantas: {error.message}</p>; // Manejo de errores

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

                <button type="submit" className="form-button">Agregar Planta</button>
            </form>
        </div>
    );
};

export default AgregarPlanta;

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import 'bootstrap/dist/css/bootstrap.css';

// Componente de filtro global (búsqueda)
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
    <input
        className="form-control mb-3"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar plantas..."
    />
);

const TablaPlantas = () => {
    const [plantas, setPlantas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlanta, setSelectedPlanta] = useState(null);
    const [nombreComun, setNombreComun] = useState('');
    const [nombreCientifico, setNombreCientifico] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate('');

    const handlereturn = () => { navigate('/Dashboard'); }

    const fetchPlantas = async () => {
        try {
            const response = await axios.get('http://localhost/API/obtenerPlantas.php');
            if (response.data && response.data.data) {
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
                const response = await axios.delete(`http://localhost/API/eliminarPlanta.php?id=${id}`);
                if (response.data.success) {
                    alert('Planta eliminada con éxito');
                    fetchPlantas();
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
            descripcion: description,
        };

        try {
            const response = await axios.put(
                'http://localhost/API/modificarPlanta.php',
                updatedPlanta,
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                alert('Planta modificada con éxito');
                setSelectedPlanta(null);
                fetchPlantas();
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

    const columns = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Nombre Común', accessor: 'nombre_comun' },
        { Header: 'Nombre Científico', accessor: 'nombre_cientifico' },
        { Header: 'Descripción', accessor: 'descripcion' },
        {
            Header: 'Acciones',
            accessor: 'acciones',
            Cell: ({ row }) => (
                <>
                    <button
                        className="btn btn-warning me-2"
                        onClick={() => {
                            setSelectedPlanta(row.original);
                            setNombreComun(row.original.nombre_comun);
                            setNombreCientifico(row.original.nombre_cientifico);
                            setDescription(row.original.descripcion);
                        }}
                    >
                        Modificar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleEliminar(row.original.id)}
                    >
                        Eliminar
                    </button>
                </>
            ),
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data: plantas,
            initialState: { hiddenColumns: ['id'] }
        },
        useFilters,
        useGlobalFilter
    );

    const { globalFilter } = state;

    if (loading) return <p>Cargando plantas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tabla-container container mt-4">
            <h2 className="text-center">Lista de Plantas</h2>
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

            <table className="table table-bordered table-striped" {...getTableProps()}>
                <thead className="thead-dark">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    }) : (
                        <tr>
                            <td colSpan={columns.length}>No hay plantas disponibles</td>
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
                                        onChange={(e) => setNombreComun(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nombre Científico</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombreCientifico}
                                        onChange={(e) => setNombreCientifico(e.target.value)}
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
            <center><button onClick={handlereturn} className="btn btn-secondary mt-3">Regresar</button></center>
        </div>
    );
};

export default TablaPlantas;

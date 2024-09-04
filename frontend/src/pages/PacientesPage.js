import '../styles/components/pages/PacientesPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PacienteItem from '../components/pacientes/PacienteItem';

const PacientesPage = () => {
    const [loading, setLoading] = useState(true);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pacientes');
                setPacientes(response.data);
            } catch (error) {
                console.error('Error al cargar los pacientes', error);
            } finally {
                setLoading(false);
            }
        };

        cargarPacientes();
    }, []);

    return (
        <section className="pacientes-holder">
            <h2 className="pacientes-title">Pacientes</h2>
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : (
                <table className="pacientes-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Información</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map(item => (
                            <PacienteItem
                                key={item.id}
                                nombre={item.nombre}
                                edad={item.edad}
                                imagen={item.imagen}
                                condicion={item.condicion}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default PacientesPage;

import React from 'react';
import '../../styles/components/PacienteItems.css';

const PacienteItem = (props) => {
    const { nombre, edad, imagen, condicion } = props;
    const imageUrlMatch = imagen.match(/src=['"](.*?)['"]/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';

    return (
        <tr className="paciente-row">
            <td className="paciente-img-cell">
                <img src={imageUrl} alt="Imagen del paciente" className="paciente-img" width='600px' height='80px'/>
            </td>
            <td className="paciente-content-cell">
                <h3>Nombre: {nombre}</h3>
                <h4>Edad: {edad}</h4>
                <div className="paciente-body" dangerouslySetInnerHTML={{__html: condicion}} />
            </td>
        </tr>
    );
}

export default PacienteItem;

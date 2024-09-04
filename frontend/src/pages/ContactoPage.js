import '../styles/components/pages/ContactoPage.css';
import { useState } from 'react';
import axios from 'axios';

const ContactoPage = () => {
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    };

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        try {
            const response = await axios.post('http://localhost:3000/api/contacto', formData);
            setMsg(response.data.message);
            if (response.data.error === false) {
                setFormData(initialForm);
            }
        } catch (error) {
            setMsg('Hubo un error al enviar el formulario.');
        } finally {
            setSending(false);
        }
    };

    return (
        <main className="holderContacto">
            <div className="form-container">
                <h2>Contáctanos</h2>
                <form onSubmit={handleSubmit} className="formulario">
                    <p>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
                    </p>
                    <p className="acciones">
                        <input type="submit" value="Enviar" />
                    </p>
                </form>
                {sending && <p>Enviando...</p>}
                {msg && <p>{msg}</p>}
            </div>
            <div className="datos">
                <h2>Otras vías de comunicación</h2>
                <p>También puede contactarse con nosotros usando los siguientes medios:</p>
                <ul>
                    <li>Teléfono: 3794857963</li>
                    <li>Email: salud@salud.com.ar</li>
                    <li>Facebook: facebook.com/salud</li>
                    <li>Instagram: @salud</li>
                </ul>
            </div>
        </main>
    );
};

export default ContactoPage;

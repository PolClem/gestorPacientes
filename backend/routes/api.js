var express = require('express');
var router = express.Router();
var pacientesModel = require('../models/pacientesModel'); 
const cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');


router.get('/pacientes', async function(req, res, next) {

    var pacientes = await pacientesModel.getPacientes();

    pacientes = pacientes.map(pacientes => {
        if (pacientes.img_id){
            const imagen = cloudinary.image(pacientes.img_id, {
                width: 600,
                height: 350,
                crop: 'fill'
            });
            return {
                ...pacientes,
                imagen
            }
        }else{
            return {
                ...pacientes,
                imagen: ''
            }
        }
    });

    res.json(pacientes);

});

router.post('/contacto', async (req,res)=>{
    console.log(req.body)
    const mail = {
        to: 'mailSalud@yopmail.com',
        subject:'Contacto web',
        html: `${req.body.nombre} se contacto a traves de la web y quiere más información a este correo: ${req.body.email} <br> Además. hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMT_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error:false,
        message: 'Mensaje enviado'
    });
})


module.exports = router;
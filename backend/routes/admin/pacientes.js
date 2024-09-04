var express = require('express');
var router = express.Router();
var pacientesModel = require('../../models/pacientesModel'); 

const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function(req, res, next) {
    
    var pacientes = await pacientesModel.getPacientes();

    pacientes = pacientes.map(paciente => {
        if (paciente.img_id){
            const imagen = cloudinary.image(paciente.img_id, {
                width: 200,
                height: 100,
                crop: 'fill',
                class: 'small'
            });
            return {
                ...paciente,
                imagen
            }
        }else{
            return {
                ...paciente,
                imagen: ''
            }
        }
    });

    res.render('admin/pacientes', {
        layout: 'admin/layout', 
        usuario: req.session.nombre,
        pacientes 
    });
});


router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', { 
        layout: 'admin/layout',  
    });
});

router.post('/agregar', async(req, res,next) => {
    try {
        var img_id = '';
        if(req.files && Object.keys(req.files).length > 0){
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if(req.body.nombre != "" && req.body.edad != "" && req.body.condicion != "" ){
            await pacientesModel.insertpaciente({
                ...req.body, 
                img_id
            });
            res.redirect('/admin/pacientes')
        }else{
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error:true,
                message: 'Todos los campos son requeridos'
            })
        }
    }catch(error){
        console.log(error)
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error:true,
            message: 'No se cargo el paciente'
        })
    }
})


router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    let paciente = await pacientesModel.getPacienteById(id);
    if(paciente.img_id){
        await (destroy(paciente.img_id))
    }

    await pacientesModel.deletePacienteById(id);
    res.redirect('/admin/pacientes');
});

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var paciente = await pacientesModel.getPacienteById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        paciente
    })
})

router.post('/modificar', async (req, res, next) => {
    try {

        let img_id = req.body.img_original; 
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1"){
            img_id = null;
            borrar_img_vieja = true;
        }else{
            if(req.files && Object.keys(req.files).length > 0){
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original){
            await (destroy(req.body.img_original));
        }

        var obj = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            condicion: req.body.condicion,
            img_id
        }
        await pacientesModel.modificarPacienteById(obj, req.body.id);
        res.redirect('/admin/pacientes');

    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout:'admin/layout',
            error:true,
            message: 'No se modifico el paciente'
        })
    }
})


module.exports = router;
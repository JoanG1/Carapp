

/**
 * Seccion donde se crean todas las peticiones http al servidor y acceder al CRUD de la base de 
 * datos (Unicamente para la informacion de atletas)
 */

const express = require('express');
const router = express.Router();

const pool = require ('../database')

router.get('/add', (req, res)=> {

    if(req.session.loggedin != true){

        res.render('Atletas/login')

    }else{

        res.render('Atletas/add',{name:req.session.name})
    }
    
})


router.post('/add', async (req, res )=>{

    const {title, description, documento, nombre_completo, direccion, fecha_nacimiento, lugar_residencia, modalidad, nivel_estudio, 
    maximo_logro, minoria_etnica, exento_cobro, genero, lugar_procedencia, actividad_economica, correo, nombre_entrenador, valor } = req.body
    const newLink = {
        title,
        description,
        documento,
        nombre_completo,
        direccion,
        fecha_nacimiento,
        lugar_residencia,
        modalidad,
        nivel_estudio,                
        maximo_logro,
        minoria_etnica,
        exento_cobro,
        genero,
        lugar_procedencia,
        actividad_economica,
        correo,
        nombre_entrenador,
        valor

    }
    await pool.query('INSERT INTO atletas_car set ?', [newLink])
    req.flash("success", "link saved successfully")
    res.redirect('/links')
})

router.get ('/delete/:id', async (req, res) =>{

    const {id} = req.params
    console.log(id)
    await pool.query('DELETE FROM atletas_car WHERE ID = ?', [id])
    res.redirect('/links')
})

router.get('/', async (req,res)=>{

    if(req.session.loggedin != true){

        res.render('Atletas/login')

    }else{

        const atletas_car = await pool.query('SELECT * FROM atletas_car')
        console.log(atletas_car)
        res.render('Atletas/list', {atletas_car, name:req.session.name})
    }
    


})

//NO FUNCIONA 

router.post ('/edit/:id', async (req, res)=>{

    const {id} = req.params
    const {title, description, documento, nombre_completo, direccion, fecha_nacimiento, lugar_residencia, modalidad, nivel_estudio, 
        maximo_logro, minoria_etnica, exento_cobro, genero, lugar_procedencia, actividad_economica, correo, nombre_entrenador, valor} = req.body
    const newLink = {
        title,
        description,
        documento,
        nombre_completo,
        direccion,
        fecha_nacimiento,
        lugar_residencia,
        modalidad,
        nivel_estudio,                
        maximo_logro,
        minoria_etnica,
        exento_cobro,
        genero,
        lugar_procedencia,
        actividad_economica,
        correo,
        nombre_entrenador,
        valor
    }
    console.log(id)
    console.log (newLink)
    await pool.query("UPDATE atletas_car set ? WHERE ID = ? ", [newLink, id])
    res.redirect('/links')
    
})

router.get ('/edit/:id', async (req, res)=>{

    const {id} = req.params
    const atletas = await pool.query("SELECT * FROM atletas_car WHERE id = ? ",  [id])
    res.render('Atletas/edit', {atleta : atletas[0]})
})


module.exports = router;
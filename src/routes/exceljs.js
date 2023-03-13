const mysql = require ('mysql')
const excel = require ('exceljs')
const express = require('express');
const router = express.Router();

const pool = require ('../database');

router.get ('/importacion', async (req, res) =>{

await pool.query('SELECT * FROM atletas_car', (err, customers, fields) => {

    if(req.session.loggedin != true){

        res.render('Atletas/login')

    }else{

    const jsonAtletas = JSON.parse(JSON.stringify(customers))
    

    let workbook = new excel.Workbook()
    let worksheet = workbook.addWorksheet('Atletas')

    worksheet.columns = [
        {header: 'Id', key: 'id', width: 10},
        {header: 'title', key: 'title', width: 50},
        {header: 'Documento', key: 'documento', width: 50},
        {header: 'Nombre completo', key: 'nombre_completo', width: 50},
        {header: 'Direccion', key: 'direccion', width: 50},
        {header: 'Fecha De Nacimiento', key: 'fecha_nacimiento', width: 50},
        {header: 'Lugar residencia', key: 'lugar_residencia', width: 50},
        {header: 'Modalidad', key: 'modalidad ', width: 50},
        {header: 'Nivel estudio ', key: 'nivel_estudio ', width: 50},
        {header: 'Maximo logro', key: 'maximo_logro', width: 50},
        {header: 'Minoria etnica', key: 'minoria_etnica', width: 50},
        {header: 'Exento_cobro', key: 'exento_cobro', width: 50},
        {header: 'Genero', key: 'genero', width: 50},
        {header: 'Lugar procedencia', key: 'lugar_procedencia', width: 50},
        {header: 'Actividad economica', key: 'actividad_economica', width: 50},
        {header: 'Correo', key: 'correo', width: 50},
        {header: 'Nombre entrenador', key: 'nombre_entrenador', width: 50},
        {header: 'Valor', key: 'ctividad_economica', width: 50},
        {header: 'Description', key: 'description', width: 50},
        {header: 'fecha de registro', key: 'created_at', width: 50, outlineLevel: 1}
    ]


    for( let i = 0 ; i < jsonAtletas.length ; i++ ){

        worksheet.addRow(jsonAtletas[i])

    }

    workbook.xlsx.writeFile('atletas.xlsx').then(()=>{
        console.log("file saved")
    })

    res.redirect('/links')

 }

})

})

module.exports = router
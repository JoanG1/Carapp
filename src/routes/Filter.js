const express = require('express');
const router = express.Router();

const pool = require ('../database')

router.post("/filtrar", async (req , res) => {

    if(req.session.loggedin != true){

        res.render('Atletas/login')

    }else{

        const {Documento} = req.body
        const atletas_car = await pool.query("SELECT * FROM atletas_car WHERE documento = ?", [Documento])
        console.log(atletas_car)
        res.render('Atletas/list',{atletas_car, name:req.session.name})
        console.log("Funcionando...")
    }


})

module.exports = router
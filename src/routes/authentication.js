
/**
 * Seccion donde se crean todas las peticiones http al servidor y acceder al CRUD de la base de 
 * datos (Unicamente para la informacion de los usuarios)
 */

const express = require('express');
const router = express.Router();
const bcrypt = require ('bcrypt')
const pool = require ('../database');
const { hash } = require('bcryptjs');



/////////SIGNUP//////////////////////////////////////////////////////////////////////////////

router.get ('/signup', (req, res) =>{
    if(req.session.loggedin != true){

        res.render('auth/signup')

    }else{

        res.redirect("/links")
    }
})


router.post ('/signup', (req,res) =>{

    const newUser = req.body

    pool.getConnection((err, conn) =>{

    
    
     conn.query('SELECT * FROM users WHERE username = ? ', [newUser.username], (err, userdata) =>{

        if(userdata.length > 0){

            res.render('auth/signup', {error: '*Error: user already exist !!!'})

        }else{

            bcrypt.hash (newUser.password, 12).then(hash => {
        
                console.log(hash)
                newUser.password = hash
                    
                console.log(newUser)
            
                pool.getConnection ((err, conn) =>{
                    
                    conn.query('INSERT INTO users set ?', [newUser], (err, rows) =>{

                        res.redirect('/login')
                    })
                
                })
            
            })

        }
     })
    })
    
    


})

////////LOGIN///////////////////////////////////////////////////////////////////////////////////////


router.get ('/login', (req, res) =>{

    if(req.session.loggedin != true){

        res.render('Atletas/login')

    }else{

        res.redirect("/links")
    }
    
})

router.post ('/login', (req, res) =>{

    const user = req.body

    pool.getConnection(async (err, conn) =>{
    
        conn.query('SELECT * FROM users WHERE username = ? ', [user.username], (err, userdata) =>{
   
           if(userdata.length > 0){

            userdata.forEach(element => {

   
               bcrypt.compare(user.password, element.password, async (err, isMatch) =>{


                if(!isMatch){

                    res.render('Atletas/login', {error: '*Incorrect password !!!'})

                }else{

                    req.session.loggedin = true
                    req.session.name = element.username

                    console.log(req.session.name)

                    const atletas_car =await pool.query('SELECT * FROM atletas_car')

                    res.render('Atletas/list', {atletas_car, name:req.session.name}) 
                
                }
               })

            })
   
            }else{


             res.render ('Atletas/login', {error : 'Error: user not exist !!!'})

   
            }
        })
    })
})

////////LOGOUT////////////////////////////////////////////////////////////////////////////////////////

router.get('/logout', (req, res) =>{

    if (req.session.loggedin == true){

        req.session.destroy()

    }

    res.redirect('/login')
})



module.exports = router
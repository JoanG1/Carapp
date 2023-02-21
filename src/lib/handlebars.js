/* LIBRERIA TIMEAGO.JS nos prestara el servicio de cambiar el formato que nos entregan sobre fecha y horario de registro,
el cual esta en un formato ilegible:

Ejemplo: 
2023/11:00/CTE1.20319/234

quedaria: 1 min ago */


const {format}  = require ('timeago.js')

const helpers = {}


helpers.timeago = (timestamp) =>{

    return format(timestamp)

}

module.exports = helpers
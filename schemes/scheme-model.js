const dB = require('../data/db-config.js')

module.exports = {
    find,
    // findById,
    // findSteps,
    // add,
    // update,
    // remove
}

//Calling find returns a promise that resolves to an array of all schemes in the database.
//No steps are included.

function find(){
    return dB('schemes');
}
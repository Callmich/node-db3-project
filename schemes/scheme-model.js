const dB = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    // update,
    // remove
}


function find(){
    return dB('schemes');
}



function findById(id){
    return dB('schemes')
    .where({ id })
    .first()
}



function findSteps(scheme_id){
    return dB('steps as st')
    .where({scheme_id})
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
    .orderBy("st.step_number")
}

// add(scheme):
// Expects a scheme object.
// Inserts scheme into the database.
// Resolves to the newly inserted scheme, including id.

function add(scheme){
    return dB('schemes')
    .insert(scheme, "id")
    .then(([id])=>{
        console.log(id)
        return findById(id)
    })
    .catch(error=>{
        console.log("Here is the error", error)
    })
}
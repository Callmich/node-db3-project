const dB = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
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


// update(changes, id):
// Expects a changes object and an id.
// Updates the scheme with the given id.
// Resolves to the newly updated scheme object.

function update(changes, id){
    return dB('schemes')
    .where({ id })
    .update(changes)
    .then(()=>{
        return findById(id)
    })
    .catch(error =>{
        console.log("Heres the error",error)
    })
}


// remove(id):
// Removes the scheme object with the provided id.
// Resolves to the removed scheme
// Resolves to null on an invalid id.
// (Hint: Only worry about removing the scheme. The database is configured to automatically remove all associated steps.)

function remove(id){

    findById(id)
    .then(item=>{
        return (deltedItem =item)
    })

    console.log(findById)
 return dB('schemes')
    .where({ id })
    .del()
    .then(count=>{
        return deltedItem
    })

}


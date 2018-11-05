const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'GroceryListApp'
});

// CREATE 
function addItem(name, quantity) {
    return db.one(`insert into groceryitems (name, quantity)
    values
        ($1,$2)
    returning id,`
    [name, quantity])
}



// RETRIEVE
function getALL() {
    return db.any('select * from groceryitems')
}

function getByID(id) {
    return db.one(`select * from groceryitems where id = $1`, [id])
    // .catch(err =>{
    //     return {
    //     name: 'No items found big fella'
    //     };
    // })
}

// UPDATE
function updateItem(id,name) {
    return db.result(`update groceryitems
    set name=$2
    where id=$1`, [id, name]);
}

function updatePurchased(id, didPurchase) {
    return db.result(`update groceryitems
    where id=$1`, [id, didPurchase])
}

function markPurchased(id) {  
    return db.result(`update groceryitems 
    set completed=$2
    where id=$1,` [id, true]);
}

function markPending(id) {
    return db.result(`update groceryitems
    set completed=$2
    where id=$1` [id, false]);
}


// DELETE

function deleteByID(id) {
    return db.result(` delete groceryitems where id = $1` [id])
}


module.exports = {
addItem,
getALL,
getByID,
updatePurchased,
updateItem,
markPurchased,
markPending,
deleteByID
};

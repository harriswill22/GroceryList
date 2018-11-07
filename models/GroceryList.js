// DATABASE CONNECTION

const db = require('./db');

class GroceryList {

constructor(id, name, quantity, purchased) {
this.id = id;
this.name = name;
this.quantity = quantity;
this.purchased = purchased;
}




// CREATE 
static addItem(name, quantity) {
    console.log('about to add item');
    
    return db.one(`insert into groceryitems (name, quantity)
    values
        ($1,$2)
    returning id`,
    [name, quantity])
    .then(item =>{
        const newItem = new GroceryList(item.id, name, quantity);
        return newItem
    });
}



// RETRIEVE
static getALL() {
    return db.any(`
    select * from groceryitems`)
    .then(itemArray => {
        const instanceArray = itemArray.map(itemObj => {
        const Allitems = new GroceryList (itemObj.id, itemObj.name, itemObj.quantity);
        return Allitems;
        });
        return instanceArray;
    })

}

static getByID(id) {
    return db.one(`select * from groceryitems where id = $1`, [id])
    .then(result =>{
        const itemID = new GroceryList(result.id, result.name, result.quantity);
        return itemID;
    })
}

// UPDATE

updateItem(name) {
    return db.result(`update groceryitems
    set name=$2
    where id=$1`, [this.id, name]);
}

updatePurchased(didPurchase) {
    return db.result(`update groceryitems
    set purchased=$2
    where id=$1`, [this.id, didPurchase])
}

markPurchased(){  
    return this.updatePurchased(true);
    // return db.result(`update groceryitems 
    // set completed=$2
    // where id=$1,` [this.id, true]);
}

markPending() {
    return this.updatePurchased(false)
    // return db.result(`update groceryitems
    // set completed=$2
    // where id=$1` [id, false]);
}


// DELETE

static deleteByID(id) {
    return db.result(`delete from groceryitems where id = $1`, [id])
}
deleteByID(){
    return db.result(` delete from groceryitems where id = $1`,[this.id])
}

}

module.exports = GroceryList; //
// }
// addItem,
// getALL,
// getByID,
// updatePurchased,
// updateItem,
// markPurchased,
// markPending,
// deleteByID
// };

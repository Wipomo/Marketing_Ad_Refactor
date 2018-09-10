const database = require("./database-connection");

module.exports = {
    list(){
        return database("customer").select();
    },
    read(id){
        return database("customer").select().where("id", id).first();
    },
    create(customer){
        return database("customer")
            .insert(customer)
            .returning('*')
            .then(record => record[0]);
    },
    update(id, customer){
        return database("customer")
            .update(customer)
            .where("id", id)
            .returning('*')
            .then(record => record[0]);
    },
    delete(id){
        return database("customer").delete().where("id", id);
    }
};
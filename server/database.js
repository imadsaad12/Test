const Pool=require("pg").Pool;

const pool=new Pool({
    user:"postgres",
    password:"test123",
    database:"testdb",
    host:"localhost",
    port:5432
})

module.exports=pool;


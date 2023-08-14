const mysql=require('mysql2');

module.exports = ()=>{
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'ST4R@im3r2320',
        database:'pozziteca'
    })
}
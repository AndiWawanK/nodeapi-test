const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err)
})

module.exports = {
    // get all employe data
    getEmploye(req, res){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query(`SELECT * FROM employe`, (error, results) => {
                if(error) throw error;
                res.send({
                    success: true,
                    message: 'Getting data successfully!',
                    data: results
                });
            });
            connection.release();
        })
    },

    // get employe data by id
    getEmployeById(req, res){
        let employeId = req.params.id;
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query(`SELECT * FROM employe WHERE id = ?;`, [employeId], (error, results) => {
                if(error) throw error;
                res.send({
                    success: results.length > 0,
                    message: 'Getting data successfully!',
                    data: results
                });
            });
            connection.release();
        });
    },

    addEmploye(req, res){
        let newEmploye = {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age
        }
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query(`INSERT INTO employe SET ?;`, [newEmploye], (error, results) => {
                // if(error) throw error;
                // res.send({
                //     success: true,
                //     message: 'Employe successfully created!',
                // });
                if(error){
                    if(error.code === 'ER_DUP_ENTRY' || error.errno === 1062){
                        res.send({
                            success: false,
                            message: 'Employe is exists!',
                        });
                    }
                }else{
                    res.send({
                        success: true,
                        message: 'Employe successfully created!',
                    });
                }
            });
            connection.release();
        })
    }
}
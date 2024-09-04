var pool = require('./bd');

async function getPacientes() {
    var query = 'select * from pacientes';
    var rows = await pool.query(query);
    return rows;
}

async function insertpaciente (obj) {
    try {
        var query = "insert into pacientes set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletepacienteById(id) {
    var query = 'delete from pacientes where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getPacienteById(id) {
    var query = 'select * from pacientes where id = ? ';
    var rows = await pool.query(query, [id]);
    return rows[0]
}

async function modificarPacienteById(obj, id){
    try{
        var query = 'update pacientes set ? where id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error){
        throw error;
    }
}

module.exports = { getPacientes: getPacientes, insertpaciente, deletePacienteById: deletepacienteById, getPacienteById: getPacienteById, modificarPacienteById: modificarPacienteById }
const Role = require('../models/Role');
const Usuario = require('../models/Usuario');

const esRoleValido = async (rol = '') => {
    const exiteRol = await Role.findOne({ rol })
    if (!exiteRol) {
        throw new Error(`El rol ${rol} no existe registrado en la BD`)
    }
}

const esEmailExiste = async(correo)=>{
    // verificamos si el correo existe
    const emailExiste = await Usuario.findOne({correo});
    if(emailExiste){
        throw new Error ('El email ya esta registrado')
    }
}

const existeUsuarioporID = async(id)=>{
    // verificamos si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error ('El ID del usuario no existe');
    }
}

module.exports ={
    esRoleValido,
    esEmailExiste,
    existeUsuarioporID
}
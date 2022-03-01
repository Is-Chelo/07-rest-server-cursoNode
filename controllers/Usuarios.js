const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');




exports.usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    });

}

exports.usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // validar password
    if (password) {
        // encriptamos password
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {
        new: true
    });

    res.json({
        usuario
    })
}

exports.usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    try {
        const usuario = new Usuario({ nombre, correo, password, rol });

        // encriptamos password
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        res.json({
            usuario
        })
    } catch (error) {
        console.log(error);
    }

}

exports.usuariosDelete = async(req, res = response) => {
    const { id } = req.params
    await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json({
        mgs:'Usuario Eliminado'
    })

}



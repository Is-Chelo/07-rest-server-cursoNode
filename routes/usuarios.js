

const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const usuariosController = require('../controllers/Usuarios');
const { validarCampos } = require('../middlewares/validarCampos');
const { esRoleValido, esEmailExiste, existeUsuarioporID } = require('../helpers/db-validators');


router.get('/', usuariosController.usuariosGet)

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioporID ),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosController.usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 letras').isLength({ min: 6 }).not().isEmpty(),
    check('correo').custom(esEmailExiste).isEmail(),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosController.usuariosPost)

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioporID ),
    validarCampos
], usuariosController.usuariosDelete)



module.exports = router
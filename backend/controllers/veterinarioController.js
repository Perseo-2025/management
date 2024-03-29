import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { email, nombre } = req.body

    // Prevenir usuarios duplicados
    const existeUsaurio = await Veterinario.findOne({ email })
    if(existeUsaurio){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try{
        // Guardar un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token,
        });

        res.json(veterinarioGuardado);
    }catch(error){
        console.log(error)
    }
}

const perfil = (req, res) => {

    const{ veterinario } = req;

    res.json({perfil : veterinario});
}

const confirmar =  async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('Token no válido')
        return res.status(404).json({msg: error.message})
    }

    try{
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg:"Usuario Confirmado Correctamente"});
    }catch(error){
        console.log(error)
    }

}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe 
    const usuario = await Veterinario.findOne({email})
    if(!usuario){
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msg: error.message})
    }

    // Comprobar si el usuario esta confirmado 
    if(!usuario.confirmado){
        const error = new Error('Tu Cuenta no ha sido confirmado')
        return res.status(403).json({msg: error.message});
    }

    // Revisar el password
    if(await usuario.comprobarPassword(password)){
            
        // Autenticar 
        res.json({token: generarJWT(usuario)});
    }else{
        const error = new Error('El Password es incorrecto')
        return res.status(404).json({msg: error.message});
    }
    

}
///////////////
const olvidePassword = async (req, res)=> {
    const {email} = req.body;
    
    const existeVeterinario = await Veterinario.findOne({email})

    if(!existeVeterinario){
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg:error.message});
    }

    try{
        existeVeterinario.token = generarId();
        await existeVeterinario.save()


        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token,
        })

        res.json({msg: "Hemos enviado un email con las instrucciones"})
    }catch(error){
        console.log(error)
    }
}
const comprobarToken = async (req, res)=> {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token})

    if(tokenValido){
        // El token no es válido el usuario existe
        res.json({msg:"Token válido y el usuario existe"})
    }else{
        const error = new Error('Token no válido');
        return res.status(400).json({msg:error.message})
    }
    
    
}
const nuevoPassword = async (req, res) => {
    const {token} = req.params; /* URL */
    const {password} = req.body; /* Lo que el usuario escriba */

    const veterinario = await Veterinario.findOne({token});

    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }

    try{
        veterinario.token = null
        veterinario.password = password
        await veterinario.save();
        res.json({msg:"Password modificado correctamente"})
    }catch(error){
        console.log(error)
    }
}   

export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword }
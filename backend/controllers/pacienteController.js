//Aquie scribimos los metodos
import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    console.log(req.body)
    paciente.veterinario = req.veterinario._id;
    console.log(paciente)
    try{
        const pacienteAlmacenado = await paciente.save();
        return res.json(pacienteAlmacenado);
    }catch(error){
        console.log(error)
    }
}
const obtenerPaciente = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes);
};

const obtenerEnfermo = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        res.status(404).json({msg:'No encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg:'Accion no válida'});
    }
   
    res.json(paciente);
    
}
const actualizarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        res.status(404).json({msg:'No encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg:'Accion no válida'});
    }
  
    // Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try{
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado)
    }catch(error){
        console.log(error)
    }
    
}
const eliminarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        res.status(404).json({msg:'No encontrado'});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg:'Accion no válida'});
    }

    try{
        await paciente.deleteOne();
        res.json({msg: "Paciente Elimindo"})
    }catch(error){
        console.log(error);
    }
}

export {agregarPaciente, 
    obtenerPaciente, 
    obtenerEnfermo, 
    actualizarPaciente, 
    eliminarPaciente 
}
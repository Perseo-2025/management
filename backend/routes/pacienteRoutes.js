import express from "express"
const router = express.Router();
import { agregarPaciente, obtenerPaciente, obtenerEnfermo, actualizarPaciente, eliminarPaciente } from '../controllers/pacienteController.js';
import checkAuth from "../middleware/auth.js";

router.route("/").
post(checkAuth, agregarPaciente).
get(checkAuth ,obtenerPaciente);

router.route('/:id').
get(checkAuth, obtenerEnfermo).
put(checkAuth, actualizarPaciente).
delete(checkAuth, eliminarPaciente)

export default router;
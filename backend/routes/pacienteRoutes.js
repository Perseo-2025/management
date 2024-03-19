import express from 'express'
const router = express.Router();
import { agregarPaciente, obtenerPaciente } from '../controllers/pacienteController.js';
import checkAuth from "../middleware/auth.js";

router.route('/').post(checkAuth, agregarPaciente).get(obtenerPaciente)

export default router
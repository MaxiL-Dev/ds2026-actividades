import {obtenerUsuarios} from "./api.js";

const usuarios = await obtenerUsuarios();
console.log(usuarios);
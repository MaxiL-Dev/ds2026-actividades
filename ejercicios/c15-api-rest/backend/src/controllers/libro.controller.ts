import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  const { disponible } = req.query;

  let filtroDisponible: boolean | undefined = undefined;
  if (disponible === "true") filtroDisponible = true;
  if (disponible === "false") filtroDisponible = false;

  const libros = libroService.findAll(filtroDisponible);
  res.json(libros);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = libroService.findById(id);

  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevoLibro = libroService.create(req.body);
  res.status(201).json(nuevoLibro);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = libroService.update(id, req.body);

  if (!actualizado) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = libroService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }
  res.status(204).send();
}
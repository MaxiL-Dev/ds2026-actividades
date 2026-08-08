import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export function getAll(_req: Request, res: Response) {
  const autores = autorService.findAll();
  res.json(autores);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autor = autorService.findById(id);

  if (!autor) {
    return res.status(404).json({ mensaje: "Autor no encontrado" });
  }
  res.json(autor);
}

export function create(req: Request, res: Response) {
  const nuevoAutor = autorService.create(req.body);
  res.status(201).json(nuevoAutor);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = autorService.update(id, req.body);

  if (!actualizado) {
    return res.status(404).json({ mensaje: "Autor no encontrado" });
  }
  res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = autorService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ mensaje: "Autor no encontrado" });
  }
  res.status(204).send();
}
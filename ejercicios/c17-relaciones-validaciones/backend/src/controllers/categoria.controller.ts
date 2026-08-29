import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

export async function getAll(req: Request, res: Response) {
  const categorias = await categoriaService.findAll();
  return res.json(categorias);
}

export async function getById(req: Request, res: Response) {
  try {
    const categoria = await categoriaService.findById(Number(req.params.id));
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nueva = await categoriaService.create(req.body);
    return res.status(201).json(nueva);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const actualizada = await categoriaService.update(Number(req.params.id), req.body);
    if (!actualizada) return res.status(404).json({ error: "Categoría no encontrada" });
    return res.json(actualizada);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const borrada = await categoriaService.remove(Number(req.params.id));
    if (!borrada) return res.status(404).json({ error: "Categoría no encontrada" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
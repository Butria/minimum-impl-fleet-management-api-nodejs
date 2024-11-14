import { Handler } from "express";
import { insertCustomer } from "../repositories/CustomerRepository"; // Asegúrate de que el path sea correcto

export const createCustomer: Handler = async (req, res) => {
  try {
    const { name, nid, telephone, email, height, age, is_minor, parent_name } = req.body;

    const customerData = {
      name,
      nid,
      telephone,
      email,
      height,
      age,
      is_minor,
      parent_name
    };

    const newCustomer = await insertCustomer(customerData);
    return res.status(201).json(newCustomer); // Devuelve el cliente creado
  } catch (error) {
    // Comprobamos si el error es una instancia de la clase Error
    if (error instanceof Error) {
      console.error("Error al crear el cliente:", error.message);
      return res.status(500).json({ error: `Error al crear el cliente: ${error.message}` });
    } else {
      console.error("Error desconocido:", error);
      return res.status(500).json({ error: 'Error al crear el cliente: Error desconocido' });
    }
  }
};
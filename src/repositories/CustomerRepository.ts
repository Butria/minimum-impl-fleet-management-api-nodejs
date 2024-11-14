import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertCustomer = async (customerData: {
  name: string;
  nid: number;
  telephone: number;
  email: string;
  height: number;
  age: number;
  is_minor: boolean;
  parent_name: string;
}) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        name: customerData.name,
        nid: customerData.nid,
        telephone: customerData.telephone,
        email: customerData.email,
        height: customerData.height,
        age: customerData.age,
        is_minor: customerData.is_minor,
        parent_name: customerData.parent_name,
      },
    });
    return customer;
  } catch (error) {
    // Comprobar si el error es de tipo Error
    if (error instanceof Error) {
      console.error("Error al insertar cliente:", error.message);
      throw new Error(`Error al insertar cliente: ${error.message}`);
    } else {
      console.error("Error desconocido:", error);
      throw new Error('Error al insertar cliente: Error desconocido');
    }
  }
};
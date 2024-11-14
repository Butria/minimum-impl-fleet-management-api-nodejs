import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

// Crear una instancia de Express
const app = express();
const prisma = new PrismaClient();
const port = 5000;  // Puerto del servidor

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Permite el acceso solo desde este origen
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para crear un nuevo cliente
app.post('/customers', async (req: Request, res: Response) => {
	try {
	  const { name, nid, telephone, email, height, age, is_minor, parent_name } = req.body;
  
	  if (!name || !nid || !telephone || !email || !height || !age || is_minor === undefined) {
		return res.status(400).json({ message: 'Todos los campos son requeridos' });
	  }
  
	  if (is_minor && !parent_name) {
		return res.status(400).json({ message: 'Se debe proporcionar el nombre del padre o tutor si el cliente es menor de edad' });
	  }
  
	  const customer = await prisma.customer.create({
		data: {
		  name,
		  nid,
		  telephone,
		  email,
		  height,
		  age,
		  is_minor,
		  parent_name: is_minor ? parent_name : null,
		},
	  });
  
	  return res.status(201).json(customer);
	} catch (error) {
	  console.error('Error al crear el cliente:', error); // Asegúrate de que este mensaje se imprima en la consola del servidor
	  if (error instanceof Error) {
		return res.status(500).json({ message: `Error al crear el cliente: ${error.message}` });
	  }
	  return res.status(500).json({ message: 'Error al crear el cliente' });
	}
  });
  

// Ruta para obtener todos los clientes
app.get('/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
});

// Ruta opcional para probar el servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de gestión de clientes');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
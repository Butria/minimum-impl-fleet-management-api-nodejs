import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

// Crear una instancia de Express
const app = express();
const prisma = new PrismaClient();
const port = 5000;  

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Permite el acceso solo desde este origen
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
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

  app.delete('/customers/:id', async (req: Request, res: Response) => {
	try {
	  const { id } = req.params;
	  const deletedCustomer = await prisma.customer.delete({
		where: { id: Number(id) },
	  });
	  return res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
	} catch (error) {
	  console.error('Error deleting customer:', error);
	  if (error instanceof Error) {
		return res.status(500).json({ message: `Error deleting customer: ${error.message}` });
	  }
	  return res.status(500).json({ message: 'Error deleting customer' });
	}
  });

  app.put('/customers/:id', async (req: Request, res: Response) => {
	try {
	  const { id } = req.params;
	  const { name, nid, telephone, email, height, age, is_minor, parent_name } = req.body;
	
	  if (!name || !nid || !telephone || !email || !height || !age || is_minor === undefined) {
		return res.status(400).json({ message: 'Todos los campos son requeridos' });
	  }
	
	  if (is_minor && !parent_name) {
		return res.status(400).json({ message: 'Se debe proporcionar el nombre del padre o tutor si el cliente es menor de edad' });
	  }
	
	  const updatedCustomer = await prisma.customer.update({
		where: { id: Number(id) },
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
	
	  return res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
	} catch (error) {
	  console.error('Error updating customer:', error);
	  if (error instanceof Error) {
		return res.status(500).json({ message: `Error updating customer: ${error.message}` });
	  }
	  return res.status(500).json({ message: 'Error updating customer' });
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

app.post('/employees', async (req: Request, res: Response) => {
	try {
	  const { name, role, email, telephone, workHours } = req.body;
	  const employee = await prisma.employee.create({
		data: {
		  name,
		  role,
		  email,
		  telephone,
		  workHours,
		},
	  });
	  return res.status(201).json(employee);
	} catch (error) {
		if (error instanceof Error) {
	  console.error('Error creating employee:', error);
	  return res.status(500).json({ message: `Error creating employee: ${error.message}` });
	} else {
	  console.error('Unknown error:', error);
	  return res.status(500).json({ message: 'An unknown error occurred' }); } }
  });
  
  app.get('/employees', async (req: Request, res: Response) => {
	try {
	  const employees = await prisma.employee.findMany();
	  return res.status(200).json(employees);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching employees:', error);
			return res.status(500).json({ message: `Error fetching employees: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' }); } }
		});
  
  app.put('/employees/:id', async (req: Request, res: Response) => {
	try {
	  const { id } = req.params;
	  const { name, role, email, telephone, workHours } = req.body;
	  const employee = await prisma.employee.update({
		where: { id: parseInt(id) },
		data: {
		  name,
		  role,
		  email,
		  telephone,
		  workHours,
		},
	  });
	  return res.status(200).json(employee);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error updating employee:', error);
			return res.status(500).json({ message: `Error updating employee: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' }); } }
		});
  
  app.delete('/employees/:id', async (req: Request, res: Response) => {
	try {
	  const { id } = req.params;
	  await prisma.employee.delete({
		where: { id: parseInt(id) },
	  });
	  return res.status(204).send();
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error deleting employee:', error);
			return res.status(500).json({ message: `Error deleting employee: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' }); } }
	});

// Ruta para crear un nuevo ticket con verificación de stationId
app.post('/tickets', async (req: Request, res: Response) => {
  try {
    const { type, price, stationId } = req.body;

    // Verificar si los datos están completos
    if (!type || !price || !stationId) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si la estación existe
    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });

    if (!station) {
      return res.status(404).json({ message: 'Estación no encontrada' });
    }

    const ticket = await prisma.ticket.create({
      data: {
        type,
        price,
        stationId
      },
    });
    return res.status(201).json(ticket);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating ticket:', error.message);
      return res.status(500).json({ message: `Error creating ticket: ${error.message}` });
    } else {
      console.error('Unknown error:', error);
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Otros endpoints y configuración del servidor...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

	  
	  
	  app.get('/tickets', async (req: Request, res: Response) => {
		try {
		  const tickets = await prisma.ticket.findMany();
		  return res.status(200).json(tickets);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error fetching tickets:', error);
			return res.status(500).json({ message: `Error fetching tickets: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	  
	  app.put('/tickets/:id', async (req: Request, res: Response) => {
		try {
		  const { id } = req.params;
		  const { type, price, stationId } = req.body;
		  const ticket = await prisma.ticket.update({
			where: { id: parseInt(id) },
			data: {
			  type,
			  price,
			  stationId
			},
		  });
		  return res.status(200).json(ticket);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error updating ticket:', error);
			return res.status(500).json({ message: `Error updating ticket: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	  
	  app.delete('/tickets/:id', async (req: Request, res: Response) => {
		try {
		  const { id } = req.params;
		  await prisma.ticket.delete({
			where: { id: parseInt(id) },
		  });
		  return res.status(204).send();
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error deleting ticket:', error);
			return res.status(500).json({ message: `Error deleting ticket: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
		
	  app.post('/attractions', async (req: Request, res: Response) => {
		try {
		  const { name, description, classification, conditions, status } = req.body;
		  const attraction = await prisma.attraction.create({
			data: {
			  name,
			  description,
			  classification,
			  conditions,
			  status
			},
		  });
		  return res.status(201).json(attraction);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error creating attraction:', error);
			return res.status(500).json({ message: `Error creating attraction: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	  
	  app.get('/attractions', async (req: Request, res: Response) => {
		try {
		  const attractions = await prisma.attraction.findMany();
		  return res.status(200).json(attractions);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error fetching attractions:', error);
			return res.status(500).json({ message: `Error fetching attractions: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	  
	  app.put('/attractions/:id', async (req: Request, res: Response) => {
		try {
		  const { id } = req.params;
		  const { name, description, classification, conditions, status } = req.body;
		  const attraction = await prisma.attraction.update({
			where: { id: parseInt(id) },
			data: {
			  name,
			  description,
			  classification,
			  conditions,
			  status
			},
		  });
		  return res.status(200).json(attraction);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error updating attraction:', error);
			return res.status(500).json({ message: `Error updating attraction: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	  
	  app.delete('/attractions/:id', async (req: Request, res: Response) => {
		try {
		  const { id } = req.params;
		  await prisma.attraction.delete({
			where: { id: parseInt(id) },
		  });
		  return res.status(204).send();
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error deleting attraction:', error);
			return res.status(500).json({ message: `Error deleting attraction: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	   
	  app.post('/attraction-access', async (req: Request, res: Response) => {
		try {
		  const { customerId, attractionId } = req.body;
	  
		  const customer = await prisma.customer.findUnique({
			where: { id: customerId }
		  });
	  
		  const attraction = await prisma.attraction.findUnique({
			where: { id: attractionId }
		  });
	  
		  if (!customer || !attraction) {
			return res.status(404).json({ message: 'Customer or attraction not found' });
		  }
	  
		  const heightRequirement = parseInt(attraction.conditions);
	  
		  if (customer.height < heightRequirement) {
			return res.status(400).json({ message: 'Customer does not meet the height requirement for this attraction' });
		  }
	  
		  return res.status(200).json({ message: 'Access granted' });
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error validating access:', error);
			return res.status(500).json({ message: `Error validating access: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });

	  app.put('/attractions/:id/status', async (req: Request, res: Response) => {
		try {
		  const { id } = req.params;
		  const { status } = req.body;
	  
		  const attraction = await prisma.attraction.update({
			where: { id: parseInt(id) },
			data: { status }
		  });
	  
		  return res.status(200).json(attraction);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error updating attraction status:', error);
			return res.status(500).json({ message: `Error updating attraction status: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	  
	  
	  app.post('/log-visit', async (req: Request, res: Response) => {
		try {
			const { customerId, attractionId } = req.body;
	
			const visit = await prisma.visit.create({
				data: {
					date: new Date(), // Asegúrate de incluir la fecha
					customer: {
						connect: { id: customerId } // Relaciona el cliente con el ID correspondiente
					},
					attractionId: attractionId // Incluye attractionId
				}
			});
	
			const visitCount = await prisma.visit.count({
				where: { customerId }
			});
	
			let discount = 0;
			if (visitCount >= 3) {
				discount = 10; // 10% de descuento
			}
	
			return res.status(200).json({ visit, discount });
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error logging visit:', error);
				return res.status(500).json({ message: `Error logging visit: ${error.message}` });
			} else {
				console.error('Unknown error:', error);
				return res.status(500).json({ message: 'An unknown error occurred' });
			}
		}
	});
	
	app.get('/stations', async (req: Request, res: Response) => {
		try {
		  const stations = await prisma.station.findMany();
		  return res.status(200).json(stations);
		} catch (error) {
		  if (error instanceof Error) {
			console.error('Error fetching stations:', error);
			return res.status(500).json({ message: `Error fetching stations: ${error.message}` });
		  } else {
			console.error('Unknown error:', error);
			return res.status(500).json({ message: 'An unknown error occurred' });
		  }
		}
	  });
	

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
// Crear una instancia de Express
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = 5000;
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5178', // Permite el acceso solo desde este origen
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware para parsear el cuerpo de las solicitudes
app.use(body_parser_1.default.json());
// Ruta para crear un nuevo cliente
app.post('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, nid, telephone, email, height, age, is_minor, parent_name } = req.body;
        if (!name || !nid || !telephone || !email || !height || !age || is_minor === undefined) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        if (is_minor && !parent_name) {
            return res.status(400).json({ message: 'Se debe proporcionar el nombre del padre o tutor si el cliente es menor de edad' });
        }
        const customer = yield prisma.customer.create({
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
    }
    catch (error) {
        console.error('Error al crear el cliente:', error); // Asegúrate de que este mensaje se imprima en la consola del servidor
        if (error instanceof Error) {
            return res.status(500).json({ message: `Error al crear el cliente: ${error.message}` });
        }
        return res.status(500).json({ message: 'Error al crear el cliente' });
    }
}));
app.delete('/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCustomer = yield prisma.customer.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    }
    catch (error) {
        console.error('Error deleting customer:', error);
        if (error instanceof Error) {
            return res.status(500).json({ message: `Error deleting customer: ${error.message}` });
        }
        return res.status(500).json({ message: 'Error deleting customer' });
    }
}));
app.put('/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, nid, telephone, email, height, age, is_minor, parent_name } = req.body;
        if (!name || !nid || !telephone || !email || !height || !age || is_minor === undefined) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        if (is_minor && !parent_name) {
            return res.status(400).json({ message: 'Se debe proporcionar el nombre del padre o tutor si el cliente es menor de edad' });
        }
        const updatedCustomer = yield prisma.customer.update({
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
    }
    catch (error) {
        console.error('Error updating customer:', error);
        if (error instanceof Error) {
            return res.status(500).json({ message: `Error updating customer: ${error.message}` });
        }
        return res.status(500).json({ message: 'Error updating customer' });
    }
}));
// Ruta para obtener todos los clientes
app.get('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield prisma.customer.findMany();
        res.json(customers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
}));
// Ruta opcional para probar el servidor
app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de gestión de clientes');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
app.post('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, role, email, telephone, workHours } = req.body;
        const employee = yield prisma.employee.create({
            data: {
                name,
                role,
                email,
                telephone,
                workHours,
            },
        });
        return res.status(201).json(employee);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating employee:', error);
            return res.status(500).json({ message: `Error creating employee: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield prisma.employee.findMany();
        return res.status(200).json(employees);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching employees:', error);
            return res.status(500).json({ message: `Error fetching employees: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, role, email, telephone, workHours } = req.body;
        const employee = yield prisma.employee.update({
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating employee:', error);
            return res.status(500).json({ message: `Error updating employee: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.employee.delete({
            where: { id: parseInt(id) },
        });
        return res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting employee:', error);
            return res.status(500).json({ message: `Error deleting employee: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
// Ruta para crear un nuevo ticket con verificación de stationId
app.post('/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, price, stationId } = req.body;
        // Verificar si los datos están completos
        if (!type || !price || !stationId) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        // Verificar si la estación existe
        const station = yield prisma.station.findUnique({
            where: { id: stationId },
        });
        if (!station) {
            return res.status(404).json({ message: 'Estación no encontrada' });
        }
        const ticket = yield prisma.ticket.create({
            data: {
                type,
                price,
                stationId
            },
        });
        return res.status(201).json(ticket);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating ticket:', error.message);
            return res.status(500).json({ message: `Error creating ticket: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
// Otros endpoints y configuración del servidor...
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get('/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield prisma.ticket.findMany();
        return res.status(200).json(tickets);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching tickets:', error);
            return res.status(500).json({ message: `Error fetching tickets: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/tickets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { type, price, stationId } = req.body;
        const ticket = yield prisma.ticket.update({
            where: { id: parseInt(id) },
            data: {
                type,
                price,
                stationId
            },
        });
        return res.status(200).json(ticket);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating ticket:', error);
            return res.status(500).json({ message: `Error updating ticket: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/tickets/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.ticket.delete({
            where: { id: parseInt(id) },
        });
        return res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting ticket:', error);
            return res.status(500).json({ message: `Error deleting ticket: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/attractions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, classification, conditions, status } = req.body;
        const attraction = yield prisma.attraction.create({
            data: {
                name,
                description,
                classification,
                conditions,
                status
            },
        });
        return res.status(201).json(attraction);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating attraction:', error);
            return res.status(500).json({ message: `Error creating attraction: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.get('/attractions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attractions = yield prisma.attraction.findMany();
        return res.status(200).json(attractions);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching attractions:', error);
            return res.status(500).json({ message: `Error fetching attractions: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/attractions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, classification, conditions, status } = req.body;
        const attraction = yield prisma.attraction.update({
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating attraction:', error);
            return res.status(500).json({ message: `Error updating attraction: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/attractions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.attraction.delete({
            where: { id: parseInt(id) },
        });
        return res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting attraction:', error);
            return res.status(500).json({ message: `Error deleting attraction: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/attraction-access', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, attractionId } = req.body;
        const customer = yield prisma.customer.findUnique({
            where: { id: customerId }
        });
        const attraction = yield prisma.attraction.findUnique({
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error validating access:', error);
            return res.status(500).json({ message: `Error validating access: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/attractions/:id/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const attraction = yield prisma.attraction.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        return res.status(200).json(attraction);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error updating attraction status:', error);
            return res.status(500).json({ message: `Error updating attraction status: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/log-visit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, attractionId } = req.body;
        const visit = yield prisma.visit.create({
            data: {
                date: new Date(), // Asegúrate de incluir la fecha
                customer: {
                    connect: { id: customerId } // Relaciona el cliente con el ID correspondiente
                },
                attractionId: attractionId // Incluye attractionId
            }
        });
        const visitCount = yield prisma.visit.count({
            where: { customerId }
        });
        let discount = 0;
        if (visitCount >= 3) {
            discount = 10; // 10% de descuento
        }
        return res.status(200).json({ visit, discount });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error logging visit:', error);
            return res.status(500).json({ message: `Error logging visit: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.get('/stations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stations = yield prisma.station.findMany();
        return res.status(200).json(stations);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching stations:', error);
            return res.status(500).json({ message: `Error fetching stations: ${error.message}` });
        }
        else {
            console.error('Unknown error:', error);
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));

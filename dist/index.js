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
const port = 5000; // Puerto del servidor
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Permite el acceso solo desde este origen
    methods: ['GET', 'POST'],
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
        console.error('Error al crear cliente:', error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error al crear el cliente' });
        }
        return res.status(500).json({ message: 'Error al crear el cliente' });
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

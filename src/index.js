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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var client_1 = require("@prisma/client");
// Crear una instancia de Express
var app = (0, express_1.default)();
var prisma = new client_1.PrismaClient();
var port = 5000; // Puerto del servidor
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Permite el acceso solo desde este origen
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware para parsear el cuerpo de las solicitudes
app.use(body_parser_1.default.json());
// Ruta para crear un nuevo cliente
app.post('/customers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, nid, telephone, email, height, age, is_minor, parent_name, customer, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, nid = _a.nid, telephone = _a.telephone, email = _a.email, height = _a.height, age = _a.age, is_minor = _a.is_minor, parent_name = _a.parent_name;
                if (!name_1 || !nid || !telephone || !email || !height || !age || is_minor === undefined) {
                    return [2 /*return*/, res.status(400).json({ message: 'Todos los campos son requeridos' })];
                }
                if (is_minor && !parent_name) {
                    return [2 /*return*/, res.status(400).json({ message: 'Se debe proporcionar el nombre del padre o tutor si el cliente es menor de edad' })];
                }
                return [4 /*yield*/, prisma.customer.create({
                        data: {
                            name: name_1,
                            nid: nid,
                            telephone: telephone,
                            email: email,
                            height: height,
                            age: age,
                            is_minor: is_minor,
                            parent_name: is_minor ? parent_name : null,
                        },
                    })];
            case 1:
                customer = _b.sent();
                return [2 /*return*/, res.status(201).json(customer)];
            case 2:
                error_1 = _b.sent();
                console.error('Error al crear cliente:', error_1);
                if (error_1 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ message: 'Error al crear el cliente' })];
                }
                return [2 /*return*/, res.status(500).json({ message: 'Error al crear el cliente' })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Ruta para obtener todos los clientes
app.get('/customers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.customer.findMany()];
            case 1:
                customers = _a.sent();
                res.json(customers);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Error al obtener los clientes' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Ruta opcional para probar el servidor
app.get('/', function (req, res) {
    res.send('Bienvenido al servidor de gestión de clientes');
});
// Iniciar el servidor
app.listen(port, function () {
    console.log("Servidor escuchando en http://localhost:".concat(port));
});

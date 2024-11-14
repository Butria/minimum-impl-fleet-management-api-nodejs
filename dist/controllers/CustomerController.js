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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = void 0;
const CustomerRepository_1 = require("../repositories/CustomerRepository"); // Asegúrate de que el path sea correcto
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newCustomer = yield (0, CustomerRepository_1.insertCustomer)(customerData);
        return res.status(201).json(newCustomer); // Devuelve el cliente creado
    }
    catch (error) {
        // Comprobamos si el error es una instancia de la clase Error
        if (error instanceof Error) {
            console.error("Error al crear el cliente:", error.message);
            return res.status(500).json({ error: `Error al crear el cliente: ${error.message}` });
        }
        else {
            console.error("Error desconocido:", error);
            return res.status(500).json({ error: 'Error al crear el cliente: Error desconocido' });
        }
    }
});
exports.createCustomer = createCustomer;

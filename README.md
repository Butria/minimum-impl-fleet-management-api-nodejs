# Fleet Management Software API NodeJS Sample Implementation

## Introducción

Este proyecto es una implementación de [Fleet Management Software API](https://github.com/Laboratoria/curriculum/tree/main/projects/05-fleet-management-api) en NodeJS, orientada a implementar los proyectos de **DevOps**. Actualmente, se han implementado varios endpoints sin autenticación para la gestión del parque Salitre Mágico.

## Endpoints Implementados

### Customers

#### POST /customers

- **Descripción**: Crea un nuevo cliente.
- **URL**: `/customers`
- **Método HTTP**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "John Doe",
    "nid": "123456789",
    "telephone": "555-1234",
    "email": "johndoe@example.com",
    "height": 170,
    "age": 25,
    "is_minor": false,
    "parent_name": null
  }
#### Respuesta exitosa: `201 Created`
- **Errores posibles**:
  - `400 Bad Request`: Todos los campos son requeridos.
  - `500 Internal Server Error`: Error al crear el cliente.

### DELETE /customers/{id}

- **Descripción**: Elimina un cliente existente.
- **URL**: `/customers/{id}`
- **Método HTTP**: `DELETE`
- **Respuesta exitosa**: `200 OK`
- **Errores posibles**:
  - `404 Not Found`: Cliente no encontrado.
  - `500 Internal Server Error`: Error al eliminar el cliente.

### PUT /customers/{id}

- **Descripción**: Actualiza la información de un cliente existente.
- **URL**: `/customers/{id}`
- **Método HTTP**: `PUT`
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "John Doe",
    "nid": "123456789",
    "telephone": "555-1234",
    "email": "johndoe@example.com",
    "height": 175,
    "age": 26,
    "is_minor": false,
    "parent_name": null
  }
**Respuesta exitosa**: `200 OK`
- **Errores posibles**:
  - `400 Bad Request`: Todos los campos son requeridos.
  - `404 Not Found`: Cliente no encontrado.
  - `500 Internal Server Error`: Error al actualizar el cliente.

### GET /customers

- **Descripción**: Obtiene un listado de todos los clientes.
- **URL**: `/customers`
- **Método HTTP**: `GET`
- **Respuesta exitosa**: `200 OK`
- **Errores posibles**:
  - `500 Internal Server Error`: Error al obtener los clientes.

### Employees

#### POST /employees

- **Descripción**: Crea un nuevo empleado.
- **URL**: `/employees`
- **Método HTTP**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "Jane Smith",
    "role": "Manager",
    "email": "janesmith@example.com",
    "telephone": "555-5678",
    "workHours": "9am - 5pm"
  }
- **Respuesta exitosa**: `201 Created`
- **Errores posibles**:
  - `500 Internal Server Error`: Error al crear el empleado.

### GET /employees

- **Descripción**: Obtiene un listado de todos los empleados.
- **URL**: `/employees`
- **Método HTTP**: `GET`
- **Respuesta exitosa**: `200 OK`
- **Errores posibles**:
  - `500 Internal Server Error`: Error al obtener los empleados.

### PUT /employees/{id}

- **Descripción**: Actualiza la información de un empleado existente.
- **URL**: `/employees/{id}`
- **Método HTTP**: `PUT`
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "Jane Smith",
    "role": "Senior Manager",
    "email": "janesmith@example.com",
    "telephone": "555-5678",### DELETE /employees/{id}

- **Descripción**: Elimina un empleado existente.
- **URL**: `/employees/{id}`
- **Método HTTP**: `DELETE`
- **Respuesta exitosa**: `204 No Content`
- **Errores posibles**:
  - `404 Not Found`: Empleado no encontrado.
  - `500 Internal Server Error`: Error al eliminar el empleado.

### Tickets

#### POST /tickets

- **Descripción**: Crea un nuevo ticket.
- **URL**: `/tickets`
- **Método HTTP**: `POST`
- **Cuerpo de la solicitud**:
  ```json
  {
    "type": "General Admission",
    "price": 50,
    "stationId": 1
  }
- **Respuesta exitosa**: `201 Created`
- **Errores posibles**:
  - `400 Bad Request`: Todos los campos son requeridos.
  - `404 Not Found`: Estación no encontrada.
  - `500 Internal Server Error`: Error al crear el ticket.

### GET /tickets

- **Descripción**: Obtiene un listado de todos los tickets.
- **URL**: `/tickets`
- **Método HTTP**: `GET`
- **Respuesta exitosa**: `200 OK`
- **Errores posibles**:
  - `500 Internal Server Error`: Error al obtener los tickets.

### PUT /tickets/{id}

- **Descripción**: Actualiza la información de un ticket existente.
- **URL**: `/tickets/{id}`
- **Método HTTP**: `PUT`
- **Cuerpo de la solicitud**:
  ```json
  {
    "type": "VIP Admission",
    "price": 100,
    "stationId": 1
  }
- **Respuesta exitosa**: `200 OK`
- **Errores posibles**:
  - `404 Not Found`: Ticket no encontrado.
  - `500 Internal Server Error`: Error al actualizar el ticket.

### DELETE /tickets/{id}

- **Descripción**: Elimina un ticket existente.
- **URL**: `/tickets/{id}`
- **Método HTTP**: `DELETE`
- **Respuesta exitosa**: `204 No Content`
- **Errores posibles**:
  - `404 Not Found`: Ticket no encontrado.
  - `500 Internal Server Error`: Error al eliminar el ticket.
# Cómo ejecutar este proyecto

## Configurar la base de datos

1. **Base de datos PostgreSQL**:
   - Necesitas una base de datos PostgreSQL en **Vercel** con las tablas `customers`, `employees`, `tickets`, `attractions` y `stations`.
   - Puedes crear esta base de datos siguiendo los pasos **2, 3 y 4** de la sección "8. Pistas, tips y lecturas complementarias" del [README de Fleet Management Software API](https://github.com/Laboratoria/curriculum/tree/main/projects/05-fleet-management-api).

## Configurar variables de entorno

1. Renombra el archivo `.env.sample` a `.env`.
2. Modifica el valor de la variable de entorno `DATABASE_URL` con la información proporcionada por Vercel.
3. Opcionalmente, cambia la variable de entorno `PORT` para especificar el puerto en el que la API escuchará peticiones HTTP.  
   > **Nota**: Esto es importante al desplegar la API en la nube para proyectos de DevOps.

## Instalar dependencias

- Ejecuta el siguiente comando en una terminal para instalar las dependencias necesarias:
  ```bash
  npm install
## Iniciar la aplicación

Ejecuta el siguiente comando en una terminal para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
## Prueba la aplicación

Haciendo peticiones GET a las siguientes rutas:

- [http://localhost:PORT/customers](http://localhost:PORT/customers)
- [http://localhost:PORT/employees](http://localhost:PORT/employees)
- [http://localhost:PORT/tickets](http://localhost:PORT/tickets)
- [http://localhost:PORT/attractions](http://localhost:PORT/attractions)
- [http://localhost:PORT/stations](http://localhost:PORT/stations)

Reemplaza `PORT` por el valor de la variable de entorno `PORT` en el archivo `.env`.

## Cómo compilar este proyecto

Ejecuta el siguiente comando en una terminal para compilar el proyecto:

```bash
npm run build
tambien esto Prueba la aplicación haciendo peticiones GET a las siguientes rutas: http://localhost:PORT/customers http://localhost:PORT/employees http://localhost:PORT/tickets http://localhost:PORT/attractions http://localhost:PORT/stations Reemplaza PORT por el valor de la variable de entorno PORT en el archivo .env. Cómo compilar este proyecto Ejecuta el siguiente comando en una terminal para compilar el proyecto: bash npm run build El resultado de la compilación estará en la carpeta build. Para probar la aplicación compilada, ejecuta el siguiente comando: bash npm run start
Aquí tienes el texto en formato Markdown:

markdown
## Prueba la aplicación

Haciendo peticiones GET a las siguientes rutas:

- [http://localhost:PORT/customers](http://localhost:PORT/customers)
- [http://localhost:PORT/employees](http://localhost:PORT/employees)
- [http://localhost:PORT/tickets](http://localhost:PORT/tickets)
- [http://localhost:PORT/attractions](http://localhost:PORT/attractions)
- [http://localhost:PORT/stations](http://localhost:PORT/stations)

Reemplaza `PORT` por el valor de la variable de entorno `PORT` en el archivo `.env`.

## Cómo compilar este proyecto

Ejecuta el siguiente comando en una terminal para compilar el proyecto:

```bash
npm run build
El resultado de la compilación estará en la carpeta build.

Para probar la aplicación compilada, ejecuta el siguiente comando:

bash
npm run start

  


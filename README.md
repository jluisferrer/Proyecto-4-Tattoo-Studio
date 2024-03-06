# Tattoo Studio ✒️

Este es mi cuarto proyecto en la academia GeekHubs, se trata de una aplicación backend de un estudio de tatuajes donde puedes registrar usuarios con diferentes roles, loguear con estos, así como ver perfil de cada usuario y modificar algunos campos, también puedes ver los servicios que ofrece el estudio asi como reservar citas para diferentes tratamientos o modificar estas adaptándolas a tu disponibilidad. A continuación se explican mas detalles sobre el proyecto.

<summary> Indice 🧾</summary>


- [Tecnologias usadas ⚙](#tecnologias-)
- [Esquema 🗺️](#esquema)
- [Instalación 🏗️](#instalacion-)
- [Endpoints 🎛️](#endpoints)
- [Fallos 🕷️](#fallos-)
- [Autor 🎨](#autor-)
- [Tiempo de realización ⏳](#tiempo-de-realizacion-)


## Tecnologias usadas

<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" 
alt="Docker"/>

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=MySQL&logoColor=white" 
alt="MySqls"/>

<img src="https://img.shields.io/badge/NodeJs-339933?style=for-the-badge&logo=Node.js&logoColor=white" 
alt="Nodejs" />

<img src="https://img.shields.io/badge/Express.js-335933?style=for-the-badge&logo=express&logoColor=white" 
alt="Express" />

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" 
alt="TypeScript" />

## Esquema 

![SchemeStudioTatoo](https://github.com/jluisferrer/Proyecto-4/assets/157707370/e2c1e793-a0b1-4ec8-bc78-fe80c9badaad)


## Instalación

<details>

<summary>Instalacion</summary>

**1**

***Clonar el repositorio***
```sh
git clone
```

**2**

***Instalar dependencias***
```sh
npm install
```

**3**

***Crear archivo .env y agregue sus propios datos como en el ejemplo .env.samples***

**4**

***Poner en marcha el servidor***
```sh
npm run dev
```

**5**

***Ejecutar las migraciones de las tablas***

```sh
npm run run-migrations
```

***Tambien puede deshacer las migraciones de las tablas***

```sh
npm run revert-migrations
```

**6**

***Agregar datos a las tablas***
***IMPORTANTE EJECUTAR POR ORDEN LAS SEEDERS !!***

```sh
npm run seed-services
```

```sh
npm run seed-roles
```

```sh
npm run seed-users
```

```sh
npm run seed-appointments
```

</details>


## Endpoints

***Instalación de Thunder Client para VSC***

Dentro de Visual studio code en el apartado extensiones (normalmente alojado en la parte inferior izquierda) deberá buscar "Thunder Client" e instalar el plugin. 
Junto con el proyecto se adjunta un archivo llamado "thunder-collection_STUDIO TATTOO.json" donde se encuentran todos los endpoints disponibles, para agregar esta colección pulse sobre el icono de Thunder Client que aparecerá despues de instalarlo en su VSC vaya al apartado "Collections" haga clic en import y busque el archivo "thunder-collection_STUDIO TATTOO.json" para agregarlo. Así podra probar todas las funciones que ofrece este proyecto. A continuacón se muestran todos los edpoints disponibles:

***AUTH***

- REGISTER 

 ```sh
POST localhost:4001/api/auth/register
 ```
***body***

 ```sh
{
   "first_name":"the-firt-name",
   "last_name":"the-last-name",
   "email":"your-email",
   "password-hash":"your-password"
}
 ```

- LOGIN 

 ```sh
POST localhost:4001/api/auth/login
 ```
***body***

 ```sh
{
   "email":"your-email",
   "password-hash":"your-password"
}
 ```
***USER***      

- GET A USER BY ID

 ```sh
localhost:4001/api/users/profile/1 <-- CAMBIE AQUI EL ID DEL USER QUE QUIERA VISUALIZAR, NECESITA ESTAR REGISTRADO
 ```

- GET ALL USERS PROFILE

 ```sh
GET localhost:4001/api/users  <-- NECESITA TENER PERMISOS SUPER-ADMIN
 ```

- UPDATE USER BY ID

 ```sh
PUT localhost:4001/api/users/profile/  <-- NECESITA ESTAR REGISTRADO
 ```
***body***

 ```sh
{
   "first_name": "update name"
}
 ```

- DELETE A USER

 ```sh
DELETE localhost:4001/api/users/2  <-- CAMBIE AQUI EL ID DEL USER, NECESITA TENER PERMISOS SUPER-ADMIN
 ```

***SERVICES***  
 - GET ALL SERVICES

```sh
GET localhost:4001/api/services
 ```

***APPOINTMENTS***  

 - GET ALL APPOINTMENTS

 ```sh
GET localhost:4001/api/appointments
 ```

 - UPDATE APPOINTMENT BY ID

 ```sh
PUT localhost:4001/api/appointments
 ```
***body***

 ```sh
{
   "appointment_id": "6",
   "user_id":"1",
   "appointment_date": "2024-03-10",
   "service_id": "2" 
}
 ```
 - GET APPOINTMENT BY ID
   
 ```sh
GET localhost:4001/api/appointments/id  <-- CAMBIE AQUI EL ID DEL APPOINTMENT
 ```

 - CREATE NEW APPOINTMENT
    
 ```sh
POST localhost:4001/api/appointments/
 ```
***body***

 ```sh
{
   "appointment_date": "2024-03-10",                       <-- INTRODUZCA AQUI SUS DATOS 
   "service_id": "1"
}
```

## FALLOS 🕷️

**Al ejecutar el "appointmentSeeder.ts" aparece el siguiente mensaje aún así las citas se guardan a partir del id:2**

```sh
throw new CannotExecuteNotConnectedError(this.name)
                  ^
CannotExecuteNotConnectedError: Cannot execute operation on "default" connection because connection is not yet established.
```

## AUTOR

- **JOSE LUIS FERRER**

   - [GitHub](https://github.com/jluisferrer/)

## Tiempo de realizacion ⌛

- Once días

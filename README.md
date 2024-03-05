# Tattoo Studio

Este es mi cuarto proyecto en la academia GeekHubs, se trata de una aplicacion backend de un estudio de tatuajes donde puedes registrar usuarios con diferentes roles, loguear con estos, asi como ver perfil de cada usuario y modificar algunos campos, también puedes ver los servicios que ofrece el estudio asi como reservar citas para diferentes tratamientos o modificar estas adaptandolas a tu disponibilidad. A continuacion se explican mas detalles sobre el proyecto.

<summary> Indice 🧾</summary>


- [Tecnologias usadas ⚙](#tecnologias-)
- [Esquema](#esquema)
- [Instalacion ⬇](#instalacion-)
- [Endpoints](#endpoints)
- [Fallos 🐛](#fallos-)
- [Autor 🙍‍♂️](#autor-)
- [Tiempo de realizacion ⌛](#tiempo-de-realizacion-)


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


## Instalacion

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

***Instalacion de Thunder Client para VSC***

Dentro de Visual studio code en el apartado extensiones (normalmente alojado en la parte inferior izquierda) debera buscar "Thunder Client" e instalar el plugin. 
Junto con el proyecto un archivo llamado "thunder-collection_STUDIO TATTOO.json" donde se encuentran todos los endpoints disponibles, para agregar esta colección pulse sobre el icono de Thunder Client que aparecerá despues de instalarlo en su VSC vaya al apartado "Collections" haga clic en import y busque el archivo "thunder-collection_STUDIO TATTOO.json" para agregarlo.








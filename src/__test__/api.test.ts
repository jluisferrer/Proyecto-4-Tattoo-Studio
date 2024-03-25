// import request from "supertest";
// import { AppDataSource } from "../database/db";
// import { app } from "../app";


// let server: any;
// let token = "";

// beforeAll(async () => {
//     await AppDataSource.initialize()
//     server = app.listen(4001);
// })

// afterAll(async () => {
//     try {
//         if (server) {
//             await server.close();
//             console.log('Server closed');
//         }
//         await AppDataSource.destroy();
//     } catch (error) {
//         console.error('Error closing server and destroying database connection:', error);
//         throw error;
//     }
// })


// describe('Api healthy', () => {
//     test('Server is healthy', async () => {
//         const { status, body } = await request(server)
//             .get('/healthy')

//         expect(status).toBe(200)
//         expect(body.success).toBe(true)
//     })
// })


// describe('Api Auth', () => {
//     test('Register user', async () => {
//         const { body, status } = await request(server)
//             .post('/api/register')
//             .send(
//                 {
//                     first_name: "Phi",
//                     last_name: "Anselmo",
//                     email: "asdasdadssd@mail.com",
//                     password_hash: "123456"
//                 })
//         console.log(body);
//         expect(status).toBe(201)
//     })
//     test('Login user', async () => {
//         const { body, status } = await request(server)
//             .post('/api/login')
//             .send(
//                 {
//                     email: "asdasdadssd@mail.com",
//                     password_hash: "123456"
//                 })
//         console.log(body);
//         token = body.token
//         expect(status).toBe(201)
//     })
//     test('update user', async () => {
//         const { body, status } = await request(server)
//             .put('/api/login')
//             .send(
//                 {
//                     name: "aasdsd",

//                 })
//             .set(`Authorization`, `Bearer ${token}`)
//         console.log(body);

//         expect(status).toBe(201)
//     })
// })


import { Appointment } from "../../models/Appointment"
import { AppDataSource } from "../db"
import { faker } from "@faker-js/faker"

const generateFakeAppointments = () => {
    const NewAppointment = Appointment.create({
        appointmentDate: faker.date.future(),
        user: { id: faker.number.int({ min: 1, max: 10 }) },
        service: { id: faker.number.int({ min: 1, max: 5 }) },
    })
    return NewAppointment;
}
const appointmentSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();
        const fakeAppointments = Array.from({ length: 10 }, generateFakeAppointments);
        await Appointment.save(fakeAppointments);
        await AppDataSource.destroy()

        console.log("Se han guardado corectamente los datos de citas")
    }
    catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
}
appointmentSeedDatabase();
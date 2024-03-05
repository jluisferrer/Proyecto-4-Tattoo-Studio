import { Role } from "../../models/Role"
import { User } from "../../models/User"
import { AppDataSource } from "../db"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

//Número de usuarios falsos con los que queremos rellenar la base de datos.
let num_users = 20
let fakeName
// usuarios falsos para completar la base de datos (con Faker)
const generateFakeUsers = () => {
  const user = new User()
  fakeName = faker.person.firstName()
  user.name = faker.person.firstName()
  user.lastName = faker.person.lastName()
  user.email = faker.internet.email()
  // Hardcode a hashed password
  user.password = bcrypt.hashSync(`${fakeName}`, 8)
  user.role = new Role()
  user.role.id = 1
  return user
}

const userSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    // Hardcoded superadmin
    const superadmin = new User()
    superadmin.name = "Super"
    superadmin.lastName = "Super"
    superadmin.email = "super@super.com"
    superadmin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    superadmin.role = new Role()
    superadmin.role.id = 3
    superadmin.save()

    // Hardcoded admin
    const admin = new User()
    admin.name = "Admin"
    admin.lastName = "Admin"
    admin.email = "admin@admin.com"
    admin.password =
      "$2b$08$Rj.Etm9wcVccDkV6jM8kM.fUFNgDDHO0fHCNWcKuGWcA4lZpXPsMO" // 123456
    admin.role = new Role()
    admin.role.id = 2
    admin.save()

    // Usuarios falsos (con role_id = 1 por defecto)
    const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers)
    await User.save(fakeUsers)

    console.log("Usuarios guardados correctamente")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

userSeedDatabase()
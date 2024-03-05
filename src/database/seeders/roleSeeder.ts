import { Role } from "../../models/Role"
import { AppDataSource } from "../db"

const roleSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const roleUser = new Role()
    roleUser.name = "user"
    roleUser.id = 1
    await roleUser.save()

    const roleAdmin = new Role()
    roleAdmin.name = "admin"
    roleAdmin.id = 2

    await roleAdmin.save()

    const roleSuperAdmin = new Role()
    roleSuperAdmin.name = "super_admin"
    roleSuperAdmin.id = 3

    await roleSuperAdmin.save()

    console.log("---------------------------")
    console.log("Roles saved successfully")
    console.log("---------------------------")
  } catch (error) {
    console.log(error)
  } finally {
    await AppDataSource.destroy()
  }
}


const seed = async () => {}

roleSeedDatabase()
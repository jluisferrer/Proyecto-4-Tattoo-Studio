import { Service } from "../../models/Service"
import { AppDataSource } from "../db"


const serviceSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const service1 = new Service()
    service1.serviceName = "Tatuajes personalizados"
    service1.description =
      "El cliente puede traer su diseño y lo entintamos en su cuerpo."
    service1.id = 1
    await service1.save()

    const service2 = new Service()
    service2.serviceName = "Tatuajes del catálogo"
    service2.description =
      "Disponemos de varios diseños sobre diseños predefinidos en nuestro catálogo."
    service2.id = 2
    await service2.save()

    const service3 = new Service()
    service3.serviceName = "Restauración y rejuvenecimiento de trabajos"
    service3.description = "Podemos arreglar viejos tatuajes borrosos."
    service3.id = 3
    await service3.save()

    const service4 = new Service()
    service4.serviceName = "Colocación de piercings y dilatadores"
    service4.description =
      "Ofrecemos servicios profesionales para la colocación de piercing y dilatadores."
    service4.id = 4
    await service4.save()

    const service5 = new Service()
    service5.serviceName = "Venta de piercings y otros artículos"
    service5.description =
      "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal."
    service5.id = 5
    await service5.save()

    console.log("Servicios guardados correctamente")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

serviceSeedDatabase()
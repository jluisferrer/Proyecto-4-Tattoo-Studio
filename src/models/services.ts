import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { appointments } from "./appointments"

@Entity('services')
export class services extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'service_name' })
    serviceName!: string

    @Column({ name: 'description' })
    description!: string

    @OneToMany(() => appointments, (appointments) => appointments.services)
    @JoinColumn({ name: 'service_id' })
    appointments!: appointments;

}

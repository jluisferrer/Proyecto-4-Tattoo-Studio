import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Service } from "./Service";

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'appointment_date' })
    appointmentDate!: Date


    @ManyToOne(() => User, (user) => user.appointment)
    @JoinColumn({ name: 'user_id' })
    user!: User[];

    @ManyToOne(() => Service, (service) => service.appointment)
    @JoinColumn({ name: 'service_id' })
    service!: Service[]
}

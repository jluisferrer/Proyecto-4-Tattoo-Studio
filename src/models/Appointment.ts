import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { users } from "./User";
import { services } from "./Service";

@Entity()
export class appointments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'appointment_date' })
    appointmentDate!: Date


    @ManyToOne(() => users, (users) => users.appointments)
    @JoinColumn({ name: 'user_id' })
    users!: users;

    @ManyToOne(() => services, (services) => services.appointments)
    @JoinColumn({ name: 'service_id' })
    services!: services
}

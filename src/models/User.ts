import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RoleSpecification } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment";

@Entity('users')
export class users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'first_name' })
    name!: string

    @Column({ name: 'last_name' })
    lastName!: string

    @Column({ name: 'email' })
    email!: string

    @Column({ name: 'password' })
    password!: string
    


    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    @JoinColumn({ name: 'user_id' })
    appointment!: Appointment;



}

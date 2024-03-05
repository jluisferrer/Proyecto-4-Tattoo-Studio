import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'first_name' })
    name!: string

    @Column({ name: 'last_name' })
    lastName!: string;

    @Column({ name: 'email' })
    email!: string

    @Column({ name: 'password', select: false })
    password!: string



    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    @JoinColumn({ name: 'user_id' })
    appointment!: Appointment[];



}

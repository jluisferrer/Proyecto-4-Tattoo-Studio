import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { roles } from "./roles"
import { appointments } from "./appointments";

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


    @ManyToOne(() => roles, (roles) => roles.users)
    @JoinColumn({ name: 'role_id' })
    roles!: roles;

    @OneToMany(() => appointments, (appointments) => appointments.users)
    @JoinColumn({ name: 'user_id' })
    appointments!: appointments;



}

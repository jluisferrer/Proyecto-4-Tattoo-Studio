import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name' })
    name!: string

    @OneToMany(() => User, (user) => user.role)           //  un rol a muchos usuarios
    user!: User[]; //puede haber un array de usuarios

}

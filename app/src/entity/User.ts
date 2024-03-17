import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    introduce?: string

    @Column()
    support?: string

    @Column()
    phone?: string

    @Column()
    email?: string

    @Column()
    other?: string

}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true, type: "bigint"})
    chat_id?: number

    @Column({nullable: true})
    name?: string

    @Column({nullable: true})
    phone?: string

    @Column({nullable: true})
    email?: string

    @Column({nullable: true})
    introduce?: string

    @Column({nullable: true})
    support?: string

    @Column({nullable: true})
    other?: string

}

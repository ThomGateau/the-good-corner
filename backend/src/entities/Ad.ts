import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MinLength } from "class-validator";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    @MinLength(10)
    description: string;

    @Column()
    owner: string;

    @Column()
    price: number;

    @Column()
    picture: string;

    @Column()
    location: string;

    @Column()
    createdAt: Date;
}
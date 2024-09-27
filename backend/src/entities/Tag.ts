import { BaseEntity, Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";

export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Ad, ad => ad.tags)
    ads: Ad[];
}
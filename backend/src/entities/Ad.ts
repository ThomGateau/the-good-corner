import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MinLength } from "class-validator";
import { Categorie } from "./Categorie";
import { Tag } from "./Tag";

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

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Categorie, (categorie) => categorie.ads, { eager: true })
  categorie: Categorie;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  tags: Tag[];
}

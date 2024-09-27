import { Categorie } from "../entities/Categorie";
import { Ad } from "../entities/Ad";
import { DataSource } from "typeorm";
import { Tag } from "../entities/Tag";

export const dataSource = new DataSource({
    database: "good_corner.sqlite",
    type: "sqlite",
    entities: [Ad, Categorie, Tag],
    synchronize: true,
    logging: ["error", "query"]
});
import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "../entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "nab_postgis",
    port: 5432,
    username: "nab_user",
    password: "16b0c454b28cf58d3d160fec2836ec14",
    database: "nab",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

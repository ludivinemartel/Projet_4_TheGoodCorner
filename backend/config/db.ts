import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./the_good_corner.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging:["error", "query"],
});

export default dataSource;
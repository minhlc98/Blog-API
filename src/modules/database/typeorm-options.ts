export const CONNECTION_NAME = "blog";

export const typeOrmOptions = {
  name: CONNECTION_NAME,
  entities: [__dirname + '/database/entities/*.entity{.ts,.js}'],
}
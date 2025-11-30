import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { typeOrmOptions, CONNECTION_NAME } from './modules/database/typeorm-options';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      name: CONNECTION_NAME,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...typeOrmOptions,
        type: 'postgres',
        host: configService.get<string>("POSTGRES_HOST") || 'localhost',
        port: configService.get<number>("POSTGRES_PORT") || 5432,
        username: configService.get<string>("POSTGRES_USERNAME") || 'admin',
        password: configService.get<string>("POSTGRES_PASSWORD") || 'admin',
        database: 'blog',
        entities: [__dirname + '/modules/database/entities/*.entity{.ts,.js}'],
      }),
    }),
    PostModule,
    UserModule,
  ],
})
export class AppModule {}

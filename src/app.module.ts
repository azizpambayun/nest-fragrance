import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumesModule } from './perfumes/perfumes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_perfume',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PerfumesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
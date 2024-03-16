import { Module } from '@nestjs/common';
import { EtudiantModule } from './etudiant/etudiant.module';


import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Etudiant } from './etudiant/etudiant.entity';

@Module({
  imports: [
    EtudiantModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Etudiant],
      database: 'etudiant_db',
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

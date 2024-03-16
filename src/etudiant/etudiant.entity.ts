import { Entity, PrimaryGeneratedColumn, Column, Decimal128 } from "typeorm";

@Entity()
export class Etudiant {
    @PrimaryGeneratedColumn()
    numEt: number;

    @Column()
    nom: string;

    @Column('decimal', { precision: 6, scale: 2 })
    moyenne: number;
}
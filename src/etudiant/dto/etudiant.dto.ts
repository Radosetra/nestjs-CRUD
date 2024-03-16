import { IsNotEmpty, IsNumber } from 'class-validator';
import { Decimal128 } from 'typeorm';

export class EtudiantDto {
    numEt: number;

    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    moyenne: number;
}
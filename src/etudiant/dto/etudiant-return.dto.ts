import { IsNotEmpty } from 'class-validator';
import { EtudiantItemListDto } from './etudiant-item-list.dto';

export class EtudiantReturnDto {
    @IsNotEmpty()
    classMoyenne: number;

    @IsNotEmpty()
    maxMoyenne: number;

    @IsNotEmpty()
    minMoyenne: number;

    etudiants: EtudiantItemListDto[];
}
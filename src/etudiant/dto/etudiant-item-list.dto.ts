import { IsNotEmpty, IsNumber } from 'class-validator';
import { EtudiantDto } from './etudiant.dto';

export class EtudiantItemListDto extends EtudiantDto {
    @IsNotEmpty()
    obs: string;
}
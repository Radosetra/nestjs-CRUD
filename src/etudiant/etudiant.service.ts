import { Injectable } from '@nestjs/common';

import { Decimal128, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult } from 'typeorm';

import { Etudiant } from './etudiant.entity';
import { EtudiantItemListDto } from './dto/etudiant-item-list.dto';
import { EtudiantDto } from './dto/etudiant.dto';
import { EtudiantReturnDto } from './dto/etudiant-return.dto';

@Injectable()
export class EtudiantService{
    constructor(
        @InjectRepository(Etudiant)
        private readonly etudiantRepository: Repository<Etudiant> ){}

    async create(etudiant: EtudiantDto): Promise<EtudiantDto> {
        return await this.etudiantRepository.save({
            nom: etudiant.nom,
            moyenne: etudiant.moyenne
        })
    }

    async getAllEtudiant(): Promise<EtudiantReturnDto> {
        const etudiants : EtudiantDto [] = await this.etudiantRepository.find({
            order: {
                numEt: 'DESC', // Sort by numEt in ascending order
            },
        });
        const etudiantList : EtudiantItemListDto[] = await Promise.all(etudiants.map((etudiant) => ({
            ...etudiant,
            obs: this.getObservation(Number(etudiant.moyenne)) 
        })))

        return this.getAllMoyenne(etudiantList);
    }

    async getEtudiant(id: number): Promise<EtudiantDto> {
        return this.etudiantRepository.findOne({
            where: {numEt: id}
        })
    }

    getAllMoyenne(etudiants: EtudiantItemListDto[]): EtudiantReturnDto{
        const moyennes: number[] = etudiants.map(etudiant => Number(etudiant.moyenne))
        const results : EtudiantReturnDto = {
            classMoyenne: this.getMoyenne(moyennes),
            maxMoyenne: this.getMaxMoyenne(moyennes),
            minMoyenne: this.getMinMoyenne(moyennes),
            etudiants: etudiants
        }

        return results
    }

    getMoyenne(moyennes: number[]): number{
        const sum = moyennes.reduce((acc, val) => acc + val, 0);
        const average = Math.round((sum / moyennes.length) * 100) / 100;
        return average;
    }

    getMaxMoyenne(moyennes: number[]): number{
        return Math.max(...moyennes)
    }

    getMinMoyenne(moyennes: number[]): number{
        return Math.min(...moyennes)
    }
    

    getObservation(moyenne: number): string {
        let result: string;
        if(moyenne >= 10) result = "admis"
        else if(moyenne > 5) result = "redoublant"
        else if(moyenne < 5) result = "exclus"

        return result
    }

    async update(etudiant: EtudiantDto): Promise<EtudiantDto> {
        const etudiantUpdated: EtudiantDto = await this.etudiantRepository.save(etudiant)

        return etudiantUpdated
    }

    async remove(numEt: number): Promise<boolean>{
        const deleteResult: DeleteResult = await this.etudiantRepository.delete({numEt})
        return deleteResult.affected > 0;
    }
}
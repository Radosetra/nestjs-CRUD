import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { EtudiantService } from './etudiant.service';

import { EtudiantItemListDto } from './dto/etudiant-item-list.dto';
import { EtudiantDto } from './dto/etudiant.dto';
import { EtudiantReturnDto } from './dto/etudiant-return.dto';

import { NotFoundException } from '@nestjs/common';

@Controller('etudiant')
export class EtudiantController {
    constructor(private readonly etudiantService: EtudiantService){}

    @Get('list')
    async getAllETudiant(): Promise<EtudiantReturnDto> {
        return this.etudiantService.getAllEtudiant()
    }

    @Get(':id')
    async getEtudiant(@Param('id') id: number): Promise<EtudiantDto | undefined>{
        const etudiant = await this.etudiantService.getEtudiant(id);
        if (!etudiant) {
            throw new NotFoundException(`Etudiant with ID ${id} not found.`);
        }

        return etudiant
    }

    @Post()
    async createEtudiant(@Body() etudiant: EtudiantDto): Promise<EtudiantDto> {
        return this.etudiantService.create(etudiant)
    }

    @Put()
    async updateEtudiant(@Body()etudiant: EtudiantDto): Promise<EtudiantDto> {
        return this.etudiantService.update(etudiant)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeEtudiant(@Param('id') id : number){
        const deletionSuccessful = await this.etudiantService.remove(id);
        if (deletionSuccessful) {
            return; // If deletion was successful, response will have status code 204
        } else {
            // If deletion was not successful, respond with appropriate status code and message
            throw new NotFoundException(`Etudiant with numEt ${id} not found.`);
        }
    }

}
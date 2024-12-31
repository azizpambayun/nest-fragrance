import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfume } from './perfume.entity';
import { CreatePerfumeDto } from './dtos/create-perfume.dto';
import { UpdatePerfumeDto } from './dtos/update-perfume.dto';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectRepository(Perfume)
    private readonly perfumeRepository: Repository<Perfume>,
  ) {}

  async findAll(): Promise<Perfume[]> {
    return this.perfumeRepository.find();
  }

  async findOne(id: number): Promise<Perfume> {
    const perfume = await this.perfumeRepository.findOneBy({ id });
    if (!perfume) {
      throw new NotFoundException(`Perfume with ID ${id} not found`);
    }
    return perfume;
  }

  async create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
    const perfume: Perfume = this.perfumeRepository.create(createPerfumeDto);
    return this.perfumeRepository.save(perfume);
  }

  async update(
    id: number,
    updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    const perfume = await this.findOne(id);
    Object.assign(perfume, updatePerfumeDto);
    return this.perfumeRepository.save(perfume);
  }

  async remove(id: number): Promise<void> {
    const perfume = await this.findOne(id);
    await this.perfumeRepository.remove(perfume);
  }
}

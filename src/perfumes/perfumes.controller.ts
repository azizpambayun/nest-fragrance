import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { CreatePerfumeDto } from './dtos/create-perfume.dto';
import { UpdatePerfumeDto } from './dtos/update-perfume.dto';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumesService: PerfumesService) {}

  @Get()
  findAll() {
    return this.perfumesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perfumesService.findOne(id);
  }

  @Post()
  create(@Body() createPerfumeDto: CreatePerfumeDto) {
    return this.perfumesService.create(createPerfumeDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerfumeDto: UpdatePerfumeDto,
  ) {
    return this.perfumesService.update(id, updatePerfumeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.perfumesService.remove(id);
  }
}

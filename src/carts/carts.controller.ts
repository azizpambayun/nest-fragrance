import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Perfume } from '../perfumes/perfume.entity';

// DTOs
class AddItemDto {
  perfumeId: number;
  quantity: number;
}

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get(':userId')
  findCartByUser(@Param('id', ParseIntPipe) userId: number) {
    return this.cartsService.findCartByUser(userId);
  }

  @Post('create/:userId')
  createCartForUser(@Param('userId', ParseIntPipe) userId: number) {
    const user = new (Perfume as any)();
    user.id = userId;
    return this.cartsService.createCartForUser(user);
  }

  @Patch(':cartId/add')
  async addItemToCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() data: AddItemDto,
  ) {
    const perfume = new Perfume();
    perfume.id = data.perfumeId;
    return this.cartsService.addItemToCart(cartId, perfume, data.quantity);
  }

  @Delete(':cartId/remove/:perfumeId')
  removeItemFromCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('perfumeId', ParseIntPipe) perfumeId: number,
  ) {
    return this.cartsService.removeItemFromCart(cartId, perfumeId);
  }

  @Delete(':cartId/clear')
  clearCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartsService.clearCart(cartId);
  }
}

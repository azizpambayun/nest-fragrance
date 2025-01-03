import { Controller, Post, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':userId')
  async createOrder(@Param('userId') userId: number): Promise<Order> {
    return this.ordersService.createOrder(userId);
  }

  @Get(':userId')
  async getOrdersByUser(@Param('userId') userId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByUser(userId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Cart } from 'src/carts/cart.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  //   create new order
  async createOrder(userId: number): Promise<Order> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.perfume'],
    });

    // check if cart is empty
    if (!cart || cart.items.length === 0) {
      throw new NotFoundException(`Cart for user with ID ${userId} not found`);
    }

    // calculate total price
    const totalPrice = cart.items.reduce(
      (total, item) => total + item.perfume.price * item.quantity,
      0,
    );

    // create order
    const order = this.orderRepository.create({
      user: cart.user,
      items: cart.items,
      totalPrice,
      status: 'Pending',
    });

    // save order
    await this.orderRepository.save(order);

    // Clear the cart after order creation
    cart.items = [];
    await this.cartRepository.save(cart);

    return order;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.perfume'],
    });
  }
}

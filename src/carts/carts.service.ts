import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { User } from 'src/users/user.entity';
import { Perfume } from 'src/perfumes/perfume.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  //   create new cart
  async createCartForUser(user: User): Promise<Cart> {
    const cart = this.cartRepository.create({ user });
    return this.cartRepository.save(cart);
  }

  //   find cart by user
  async findCartByUser(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.perfume'],
    });
    return cart;
  }

  //   add item to cart
  async addItemToCart(
    cartId: number,
    perfume: Perfume,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.perfume'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    // check if perfume already in cart
    let cartItem = cart.items.find((item) => item.perfume.id === perfume.id);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepository.create({ perfume, quantity });
      cart.items.push(cartItem);
    }

    // save cart
    return this.cartRepository.save(cart);
  }

  //   remove item from cart
  async removeItemFromCart(cartId: number, perfumeId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.perfume'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    cart.items = cart.items.filter((item) => item.perfume.id !== perfumeId);
    return this.cartRepository.save(cart);
  }

  //   clear cart
  async clearCart(cartId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    await this.cartRepository.remove(cart);
  }
}

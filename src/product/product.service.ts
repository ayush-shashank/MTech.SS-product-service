import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOneById(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  findByName(name: string) {
    return this.productRepository.findBy({ name: Like(`%${name}%`) });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  orderPlaced(orders: { id: number; quantity: number }[]) {
    orders.forEach((order) => {
      let updateDto = new UpdateProductDto();
      Logger.debug(order.id, 'pid');
      updateDto = {
        id: order.id,
        quantity: order.quantity,
      };
      Logger.debug(updateDto, 'updateDto');
      this.update(order.id, updateDto);
    });
  }

  getQuantities(ids: number[]) {
    return this.productRepository.find({
      select: { id: true, quantity: true },
      where: { id: In(ids) },
    });
  }
}

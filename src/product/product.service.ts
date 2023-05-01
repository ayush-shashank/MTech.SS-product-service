import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
    // return 'This action adds a new product';
  }

  findAll() {
    return this.productRepository.find({});
    // return `This action returns all product`;
  }

  findOneById(id: number) {
    return this.productRepository.findOneBy({ id });
    // return `This action returns a #${id} product`;
  }

  findByName(name: string) {
    return this.productRepository.findBy({ name });
    // return `This action returns a product with name ${name}`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
    // return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return this.productRepository.delete(id);
    // return `This action removes a #${id} product`;
  }
}

import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern('findAllProduct')
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern('findOneProduct')
  findOne(@Payload() id: number) {
    return this.productService.findOneById(id);
  }

  @MessagePattern('findByNameProduct')
  findByName(@Payload() name: string) {
    return this.productService.findByName(name);
  }

  @MessagePattern('updateProduct')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern('removeProduct')
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }

  @EventPattern('orderPlaced')
  orderPlaced(@Payload() orders: { id: number; quantity: number }[]) {
    return this.productService.orderPlaced(orders);
  }

  @MessagePattern('getQuantities')
  getQty(ids: number[]) {
    return this.productService.getQuantities(ids);
  }
}

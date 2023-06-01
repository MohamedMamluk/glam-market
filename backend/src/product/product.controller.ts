import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct() {
    return this.productService.getProduct();
  }

  @Post()
  addProduct() {
    return this.productService.addProduct();
  }

  @Patch(':id')
  updateProduct() {
    return this.productService.updateProduct();
  }

  @Delete(':id')
  deleteProduct() {
    return this.productService.deleteProduct();
  }
}

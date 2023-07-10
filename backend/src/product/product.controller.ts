import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
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

  @Post('')
  @UsePipes(ValidationPipe)
  addProduct(@Body() product: CreateProductDTO) {
    return this.productService.addProduct(product);
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

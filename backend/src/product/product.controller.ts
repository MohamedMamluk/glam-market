import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRole } from 'src/user/schemas/user.schema';
import { CreateProductDTO } from './dto/create-product.dto';

import { ProductService } from './product.service';
import { IsMongoId } from 'src/pipes/isMongoId.pipe';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id', IsMongoId) productId: string) {
    return this.productService.getProduct(productId);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.ADMIN)
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

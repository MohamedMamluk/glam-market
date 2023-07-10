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
import { UpdateProductDTO } from './dto/update-product.dto';

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
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.ADMIN)
  updateProduct(
    @Param('id', IsMongoId) productId: string,
    @Body() product: UpdateProductDTO,
  ) {
    return this.productService.updateProduct(productId, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.ADMIN)
  deleteProduct(@Param('id', IsMongoId) productId: string) {
    return this.productService.deleteProduct(productId);
  }
}

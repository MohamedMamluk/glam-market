import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
@Injectable({})
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly Product: Model<Product>,
  ) {}
  getProducts() {}

  getProduct() {}

  addProduct(product: CreateProductDTO) {
    return this.Product.create(product);
  }

  updateProduct() {}

  deleteProduct() {}
}

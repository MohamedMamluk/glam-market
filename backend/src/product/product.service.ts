import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
@Injectable({})
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly Product: Model<Product>,
  ) {}

  getProducts() {
    return this.Product.find();
  }

  async getProduct(productId: string) {
    const product = await this.Product.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  addProduct(product: CreateProductDTO) {
    return this.Product.create(product);
  }

  updateProduct(productId: string, updateProductData: UpdateProductDTO) {
    return this.Product.findByIdAndUpdate(productId, updateProductData, {
      new: true,
    });
  }

  deleteProduct(productId: string) {
    return this.Product.findByIdAndDelete(productId);
  }
}

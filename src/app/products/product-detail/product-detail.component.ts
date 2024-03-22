import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  product: Product;

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        () => {
          console.log('Product deleted.')
          this.productService.initProducts()
          this.router.navigateByUrl('/products')
        }
      )
  }

  @Input() set id(productId) {
    this
      .productService
      .getProductById(productId)
      .subscribe(
        data => this.product = data
      )
  }




}

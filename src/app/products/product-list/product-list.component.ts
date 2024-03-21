import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, ProductDetailComponent]
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product
  private productService = inject(ProductService)
  products$: Observable<Product[]> = this.productService.products$

  pageNumber = 1;
  pageSize = 5;
  start = 0;
  end = this.pageSize;

  previousPage() {
    this.selectedProduct = undefined;
    this.pageNumber--;
    this.start -= this.pageSize;
    this.end -= this.pageSize;
  }

  nextPage() {
    this.selectedProduct = undefined;
    this.pageNumber++;
    this.start += this.pageSize;
    this.end += this.pageSize;
  }


  onSelect(product: Product) {
    this.selectedProduct = product;
  }
}

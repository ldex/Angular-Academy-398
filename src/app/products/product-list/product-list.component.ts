import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
    imports: [CommonModule, ProductDetailComponent, RouterModule]
})
export class ProductListComponent {
  title: string = 'Products'
  selectedProduct: Product

  private router = inject(Router)
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
    this.router.navigateByUrl('/products/' + product.id);
  }
}

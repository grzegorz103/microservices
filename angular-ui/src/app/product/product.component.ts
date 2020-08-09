import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormControl} from "@angular/forms";
import {CartWindowService} from "../services/cart-window.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: any;
  pageSize = 5;
  nameControl = new FormControl('');
  priceFromControl = new FormControl('');
  priceToControl = new FormControl('');

  constructor(private productService: ProductService,
              private cartService: CartWindowService) {
  }

  ngOnInit() {
    this.nameControl.valueChanges.subscribe(v => this.fetchProducts(0));
    this.priceFromControl.valueChanges.subscribe(v => this.fetchProducts(0));
    this.priceToControl.valueChanges.subscribe(v => this.fetchProducts(0));
    this.fetchProducts(0);
  }

  fetchProducts(page: number) {
    this.productService.getAll(page, this.pageSize,
      this.nameControl.value,
      this.priceFromControl.value,
      this.priceToControl.value)
      .subscribe(res => {
        console.log(res)
        this.products = res;
      });
  }

  addToCart(product: any) {
    this.cartService.addProduct(product);
    this.cartService.show();
  }

}

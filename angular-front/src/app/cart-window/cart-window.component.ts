import {Component, OnInit} from '@angular/core';
import {CartWindowService} from "../cart-window.service";
import {MatListOption} from "@angular/material/list";
import {OrderService} from "../order.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-cart-window',
  templateUrl: './cart-window.component.html',
  styleUrls: ['./cart-window.component.scss']
})
export class CartWindowComponent implements OnInit {
  selectedItems: any[];
  toggleSidebar = false;

  constructor(private cartWindowService: CartWindowService,
              private orderService: OrderService) {
  }

  ngOnInit() {
  }

  hide() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  onGroupsChange(selected: MatListOption[]) {
    this.selectedItems = selected.map(e => e.value);
  }

  deleteSelectedProducts() {
    this.cartWindowService.products = this.cartWindowService
      .products
      .filter(e => !this.selectedItems.some(f => f.id === e.id));
    this.cartWindowService.save();
  }

  createOrder() {
    this.orderService.create({productIds: this.cartWindowService.products.map(e => e.id)})
      .subscribe(res => {
        alert('Created new order')
        this.cartWindowService.clear();
      });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@cart-angular/types';
import { Store, select } from '@ngrx/store';
import { AppService } from '../../../app.service';
import * as fromProduct from '@cart-angular/cart-state';
import { AppConstants } from '@cart-angular/types';
import { CartFacade } from '@cart-angular/cart-state';

@Component({
  selector: 'cart-angular-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss']
})
export class CartMainComponent implements OnInit, OnDestroy {

  viewFlag = false;
  billingFlag = false;
  productDetail: Product;
  componentActive = true;
  cartSubscription$;
  cartInput = AppConstants.CART_INPUT;
  constructor(private store: Store<fromProduct.State>, public appService: AppService, 
    public facade: CartFacade) { }

  products = [];
  ngOnInit(): void {
  //   this.store.pipe(select(fromProduct.getCartList),
  //   takeWhile(() => this.componentActive)).subscribe(cartList => {
  //     this.products = cartList;
  // });
  this.cartSubscription$ = this.facade.cartProducts$
  .subscribe(cartList => {
    this.products = cartList;
   });
  }

  ngOnDestroy() {
    // this.componentActive = false;
    this.cartSubscription$.unsubscribe();
  }

  viewProduct(product: Product) {
    this.viewFlag = true;
    this.billingFlag = false;
    this.productDetail = product;
  }

  closeProduct() {
    this.viewFlag = false;
    this.billingFlag = false;
  }

  openBillPage(product: Product) {
    this.viewFlag = false;
    this.billingFlag = true;
    this.productDetail = product;
  }

  removeProduct() {
    this.closeProduct();
    this.appService.messageSuccess = true;
    this.appService.toggleMessageWindow();
  }
}

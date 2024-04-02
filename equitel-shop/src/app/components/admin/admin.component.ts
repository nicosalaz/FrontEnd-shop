import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { CreateShoppingCarReq } from '../shared/interfaces/create-shopping-car-req';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCar } from '../shared/models/shopping-car';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateShoppingCartReq } from '../shared/interfaces/update-shopping-cart-req';
import { CreateSaleReq } from '../shared/interfaces/create-sale-req';
import { SaleService } from '../shared/services/sale.service';
import { GeneratePdfComponent } from '../shared/generate-pdf/generate-pdf.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  productsList: Product[]=[];
  cartList: ShoppingCar[]=[];
  reqCart: CreateShoppingCarReq;
  reqUpdCart: UpdateShoppingCartReq;
  totalCompra:number = 0;
  reqCreateSale:CreateSaleReq;
  formModify: FormGroup = new FormGroup({
    idCart: new FormControl(0),
    amount: new FormControl(0)
  })
  pdf:GeneratePdfComponent = new GeneratePdfComponent(this.saleService);
  constructor(private productService: ProductService, private authService: AuthService,
    private cartService: ShoppingCartService, private saleService:SaleService) { }
  ngOnInit() {
    this.fillProdutcs();
    this.getAllCart();
  }
  fillProdutcs() {
    this.productService.getAllProducts().subscribe((res) => {
      // console.log(res);
      this.productsList = res
    },
      (err) => {
        console.error(err);
      })
  }
  addCart(id: number) {
    console.log(this.productsList[id]);
    this.reqCart = {
      fkProduct: this.productsList[id].id,
      fkEmployee: this.authService.getIdEmployee,
      amount: 1
    }
    this.cartService.addShopingCart(this.reqCart).subscribe((res) => {
      // console.log(res.msg);
      this.authService.notificationSuccess(res.msg);
      this.getAllCart();
    }, (err) => {
      console.error(err.error.messageError);
      this.authService.notificationError(err.error.messageError);

    })
  }
  getAllCart() {
    this.cartService.getCart().subscribe((res) => {
      // console.log(res);
      this.cartList = res;
      this.sumTotal();
    }, (err) => {
      console.error(err);
      this.authService.notificationError(err.error.messageError);
    })
  }
  deleteItemCar(id: number) {
    this.cartService.deleteItem(this.cartList[id].id).subscribe((res) => {
      this.authService.notificationSuccess(res.msg);
    }, (err) => {
      console.error(err);
      this.authService.notificationError(err.error.messageError);
    })
  }

  modifyQuantity(pos: number, quantity: number) {
    this.formModify.patchValue({
      idCart: this.cartList[pos].id,
      amount: quantity
    })
  }

  validateAmount() {
    // console.log(this.formModify.value.amount);
    if (this.formModify.value.amount > 0) {
      return false;
    }
    return true;
  }
  modifyAmount() {
    this.reqUpdCart = this.formModify.value;
    console.log(this.reqUpdCart);
    this.cartService.modifyItem(this.reqUpdCart).subscribe((res)=>{
      this.authService.notificationSuccess(res.msg);
    },(err)=>{
      console.error(err);
      this.authService.notificationError(err.error.messageError);

    }) 
  }
  sumTotal(){
    this.cartList.forEach((item)=>{
      this.totalCompra+=item.price;
    })
  }
  isCartEmpty() {
    return this.cartList.length>0?false:true;   
  }
  endSale() {
    this.reqCreateSale ={
      fkEmployee:this.authService.getIdEmployee,
      total: this.totalCompra
    }
    this.saleService.createSale(this.reqCreateSale).subscribe((res)=>{
      console.log(res);
      this.pdf.createTicket(this.authService.getIdEmployee,this.totalCompra,this.cartList);
      this.authService.notificationSuccess("Venta registrada exitosamente");
    },(err)=>{
      console.error(err);
    })
  }
}

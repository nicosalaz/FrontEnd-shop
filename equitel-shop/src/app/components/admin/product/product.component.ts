import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../../shared/services/provider.service';
import { Provider } from '../../shared/models/provider';
import { CreateOrUpdateProductReq } from '../../shared/interfaces/create-or-update-product-req';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productList:Product[];
  providerList:Provider[];
  reqProd: CreateOrUpdateProductReq;
  formProduct:FormGroup = new FormGroup({
    id:new FormControl(0),
    nameProd:new FormControl(),
    provider: new FormControl(),
    price: new FormControl(),
    amount:new FormControl(),
    description: new FormControl(),
    model: new FormControl()
  })
  update:boolean = false;
  constructor(private prodService:ProductService,
    private provService:ProviderService,
    private authService:AuthService) { }

  ngOnInit(){
    this.fillProducts();
    this.fillProviders();
  }
  fillProducts(){
    this.prodService.getAllProducts().subscribe((res)=>{
      // console.log(res);
      this.productList=res;
    },(err)=>{
      console.error(err);
    })
  }

  fillProviders(){
    this.provService.getAllProviders().subscribe((res)=>{
      // console.log(res);
      this.providerList = res;
    },(err)=>{
      console.error(err);
      
    })
  }

  createProd(){
    this.update=false
    // console.log(this.formProduct.value);
    this.reqProd = {
      id:this.formProduct.value.id,
      name:this.formProduct.value.nameProd,
      description:this.formProduct.value.description,
      price:this.formProduct.value.price,
      model:this.formProduct.value.model,
      existence:this.formProduct.value.amount,
      fkProvider:this.formProduct.value.provider
    }
    this.prodService.createProduct(this.reqProd).subscribe((res)=>{
      // console.log(res);
      this.authService.notificationSuccess(res.msg);
    },(err)=>{
      console.error(err);
      
    })
  }
  prepareUpdate(pos:number){
    this.update=true;
    const objProd = this.productList[pos];
    this.formProduct.patchValue({
      nameProd:objProd.name,
      provider: objProd.fkProvider.nit,
      price: objProd.price,
      amount:objProd.existence,
      description: objProd.description,
      model: objProd.model,
      id:objProd.id
    })
    // console.log(this.productList[pos]);
  }
  updateProduct(){
    this.reqProd = {
      id:this.formProduct.value.id,
      name:this.formProduct.value.nameProd,
      description:this.formProduct.value.description,
      price:this.formProduct.value.price,
      model:this.formProduct.value.model,
      existence:this.formProduct.value.amount,
      fkProvider:this.formProduct.value.provider
    }
    this.prodService.updateProduct(this.reqProd).subscribe((res)=>{
      // console.log(res);
      this.authService.notificationSuccess(res.msg);
    },(err)=>{
      console.error(err);
    })
  }

  deleteProduct(id:number){
    Swal.fire({
      title: "¿Seguro desea eliminarlo?",
      text: "Se eliminará definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.prodService.deleteProduct(id).subscribe((res)=>{
          Swal.fire({
            title: "Eliminado!",
            text: res.msg,
            icon: "success",
            showConfirmButton:false,
            timer:2000
          }).then(()=>{
            window.location.reload();
          });
        })
      }else{
        Swal.fire({
          title: "Cancelado",
          text: "Operación cancelada!",
          icon: "info",
          showConfirmButton:false,
          timer:2000
        })
      }
    });
  }
}

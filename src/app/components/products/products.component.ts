//import { prodcut } from 'src/app/model/product.model';
import { DataStateEnum } from './../../state/product.state';
import { Prodcut } from './../../model/product.model';
import { ProductsService } from './products.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { start } from 'node:repl';
import {catchError, map, startWith} from 'rxjs/operators';
import { AppDataState } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products$:Observable<AppDataState<Prodcut[]>> |null=null;
 readonly DataStateEnum=DataStateEnum;

  constructor(private ProductsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$=this.ProductsService.getAllProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() { 
    this.products$=this.ProductsService.getSelectedProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetAvailableProducts() {
    this.products$=this.ProductsService.getAvailableProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onSearch(dataForm: any) {
    this.products$=this.ProductsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  onSelect(p: Prodcut) {
    this.ProductsService.select(p)
        .subscribe(data=>{
          p.selected=data.selected;
        })
  }
  onDelete(p:Prodcut) {
    let v=confirm("Etes vous sure?");
    if(v==true)
this.ProductsService.deleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    })
  }
  onNewProducts() {
    this.router.navigateByUrl("/newProduct");
  }
  onEdit(p: Prodcut) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
  

}

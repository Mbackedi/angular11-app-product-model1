import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { prodcut } from 'src/app/model/product.model';
import { ProductsService } from './../products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup?:FormGroup;
  private submitted:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, 
    private ProductsService:ProductsService,
    private fb:FormBuilder) {
    this.productId=activatedRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.ProductsService.getProduct(this.productId)
      .subscribe(prodcut=>{
       this.productFormGroup=this.fb.group({
          id:[prodcut.id,Validators.required],
          name:[prodcut.name,Validators.required],
          price:[prodcut.price,Validators.required],
          quantity:[prodcut.quantity,Validators.required],
          selected:[prodcut.selected,Validators.required],
          available:[prodcut.available,Validators.required]
        })
      });
  }

  onUpdateProduct() {
    this.ProductsService.updateProduct(this.productFormGroup?.value)
     .subscribe(data=>{
        alert("Produit modifié avec succés");
     });
  }

}

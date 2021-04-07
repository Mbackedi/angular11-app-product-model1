//import { product } from 'src/app/model/product.model';
import { Prodcut} from './../../model/product.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn:"root"})
export class ProductsService {
constructor(private http:HttpClient){

}

getAllProducts():Observable<Prodcut[]>{
    //let host=(Math.random()>0.2)?environment.host:environment.unreachableHost;
    let host=environment.host;
    return this.http.get<Prodcut[]>(host+"/products");
}
getSelectedProducts():Observable<Prodcut[]>{
    let host=environment.host;
    return this.http.get<Prodcut[]>(host+"/products?selected=true");
}
getAvailableProducts():Observable<Prodcut[]>{
    let host=environment.host;
    return this.http.get<Prodcut[]>(host+"/products?available=true");
}
searchProducts(keyword:string):Observable<Prodcut[]>{
    let host=environment.host;
    return this.http.get<Prodcut[]>(host+"/products?name_like="+keyword);
}
select(prodcut:Prodcut):Observable<Prodcut>{
    let host=environment.host;
    prodcut.selected=!prodcut.selected;
    return this.http.put<Prodcut>(host+"/products/"+prodcut.id,prodcut);
}
deleteProduct(prodcut:Prodcut):Observable<void>{
    let host=environment.host;
    prodcut.selected=!prodcut.selected;
    return this.http.delete<void>(host+"/products/"+prodcut.id);
}
save(prodcut:Prodcut):Observable<Prodcut>{
    let host=environment.host;
    return this.http.post<Prodcut>(host+"/products",prodcut);
}
getProduct(id:number):Observable<Prodcut>{
    let host=environment.host;
    return this.http.get<Prodcut>(host+"/products/"+id);
}
updateProduct(product:Prodcut):Observable<Prodcut>{
    let host=environment.host;
    return this.http.put<Prodcut>(host+"/products/"+product.id,product);
}
}
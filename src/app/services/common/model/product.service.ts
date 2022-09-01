import { _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { ContentChild, Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientservice:HttpClientService) { }


  createProduct(product:Create_Product
    ,successCallBack?:any
    ,errorCallBack?:any)
    {
    this.httpclientservice.post({controller:"products"},
    product).subscribe(result=>{
      successCallBack();
      alert("Working")
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key:string,value:Array<string>}>= errorResponse.error;
      
      
      let message:string="";

      _error.forEach((v,index)=>{
        v.value.forEach((_v,_index)=>{
          message+=`${_v}<br/>`
        })
      });

      errorCallBack(message);
    });
  }
}

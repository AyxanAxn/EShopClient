import { _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContentChild, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientservice:HttpClientService) { }


  createProduct(product:Create_Product
    ,successCallBack?:()=>void
    ,errorCallBack?:(errorMessage:string)=>void)
    {
    this.httpclientservice.post({controller:"products"},
    product).subscribe(result=>{
      successCallBack();
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

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: 
  (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const promiseData: Promise<{ totalProductCount: number; products: List_Product[] }> = 
    this.httpclientservice.get<{ totalProductCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
 
  async delete(id: string) {
    //Id is coming from directive!

    const deleteObservable: Observable<any> = this.httpclientservice.delete<any>({
      controller: "products"
    }, id);

    var a = await firstValueFrom(deleteObservable);
    
  }
}
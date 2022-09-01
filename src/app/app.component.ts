import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 
export class AppComponent {
  title = 'EShopClient';

}
 
//https://localhost:7169
// $.get("https://localhost:7169/api/Products",data=>{
//   console.log(data);
// })
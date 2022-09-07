import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/model/product.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { __exportStar } from 'tslib';

declare var $ : any;
//Directive is using for our clear code and 
//to reduce the originality
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor(private element:ElementRef,
    private _renderer:Renderer2,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog) { 
      const img = _renderer.createElement("img");
      img.setAttribute("src", "../../../../../assets/delete.png");
      img.setAttribute("style", "cursor: pointer;");
      img.width = 25;
      img.height = 25;
      _renderer.appendChild(element.nativeElement, img);    
    }
    
    @Output() callback : EventEmitter<any>=new EventEmitter();

    @Input() id: string;
    //@Input is using for to take the data from 
    //html input.
    @HostListener("click")
    //This is used for to listen an event from html.
    async onclick(){
      this.openDialog(async ()=>{
        this.spinner.show(SpinnerType.ballSpinClockwiseFadeRotating);
        const td : HTMLTableCellElement= this.element.nativeElement;
        await this.productService.delete(this.id);
        $(td.parentElement).animate({  
          opacity:0,
          left:"+50",
          height:"toogle"
        },700,()=>{
          this.callback.emit();
        })
        this.spinner.hide(SpinnerType.ballSpinClockwiseFadeRotating);
      });
    }


    openDialog(afterClosed:any): void {

      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: DeleteState.Yes,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result==DeleteState.Yes){
         afterClosed();
        }

    });


  }
}

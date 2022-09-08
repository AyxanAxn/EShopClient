import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';
import { AlertifyService } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
  @Input() options:Partial<FileUploadOptions>
  public files: NgxFileDropEntry[];
  constructor(private httpClientService:HttpClientService,private alertifyService:AlertifyService,private  toastrService:ToastrService) {}
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
   

    const fileData:FormData=new FormData();


    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
          fileData.append(_file.name,_file,file.relativePath);
      });
    }

    this.httpClientService.post({
        controller:this.options.controller,
        action:this.options.action,
        queryString : this.options.queryString,
        headers:new HttpHeaders({"responseType" : "blob"})
    },fileData).subscribe(data=>
    {

    },(errorResponse:HttpErrorResponse)=>
    {

    });

  }
}
export class FileUploadOptions{
  isAdminPage?:boolean=false;
  explanation?:string;
  queryString?:string;
  controller?:string;
  action?:string;
  accept?:string;
}

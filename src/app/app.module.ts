import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDirective } from './directives/admin/delete.directive';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiModule } from './ui/ui.module';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule, UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config : {
        tokenGetter: ()=> localStorage.getItem("accessToken"),
        allowedDomains : ["localhost:7169"],
      }
    })

  ],
  providers: [
    {provide:"baseUrl", useValue:"https://localhost:7169/api", multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
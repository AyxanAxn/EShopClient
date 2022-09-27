import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/createUser';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclientservice:HttpClientService) { }



  async create(user:User):Promise<Create_User>{
    const observable:Observable<Create_User | User> =  this.httpclientservice.post<Create_User | User>({
      controller:"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }


async login(usernameOrEmail,password,callBackFunction?:()=>void) :Promise<void> {
  const observable:Observable<any> = this.httpclientservice.post({
    controller:"users",
    action:"login"
  }, { usernameOrEmail,password })
  await firstValueFrom(observable);
  callBackFunction();
}

}

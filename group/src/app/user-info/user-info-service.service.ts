import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoServiceService {

  constructor( private http:HttpClient)
  {  }
    getUserInfo()
    {
    return this.http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json');
    }
}

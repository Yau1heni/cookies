import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./app.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = "https://testologia.ru";

  constructor(private http: HttpClient) {
  }

  getCookies() {
    return this.http.get<Product[]>(`${this.baseUrl}/cookies`);
  }

  confirmOrder(payload: any) {
    this.http.post<any>(`${this.baseUrl}/cookies-order`, payload).subscribe({
      next: (response: { message: string, success: 0 | 1 }) => {
        alert(response.message)
      },
      error: ({error}) => {
        alert(error.message)
      }
    });
  }
}

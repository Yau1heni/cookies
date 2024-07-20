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

  switchSugarFree(checked: boolean) {
    const queryParam = checked ? '?sugarfree' : ''
    return this.http.get<Product[]>(`${this.baseUrl}/cookies${queryParam}`)
  }

  confirmOrder(payload: any) {
    this.http.post<{ message: string, success: 0 | 1 }>(`${this.baseUrl}/cookies-order`, payload).subscribe({
      next: (response) => {
        alert(response.message)
      },
      error: ({error}) => {
        alert(error.message)
      }
    });
  }
}

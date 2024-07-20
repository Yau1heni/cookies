import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Product} from "./app.model";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currency = '$'

  productsData: Product[] = [];

  form = this.fb.group({
    product: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getCookies().subscribe(cookies => {
      this.productsData = cookies
    });
  }

  scrollTo(target: HTMLElement, product?: any) {
    target.scrollIntoView({behavior: 'smooth'});

    if (product) {
      this.form.patchValue({product: product.title + ' (' + product.price + ' ' + this.currency + ')'});
    }
  }

  switchSugarFree(e: Event) {
    this.appService.switchSugarFree((e.currentTarget as HTMLInputElement).checked)
      .subscribe(data => this.productsData = data);
  }

  changeCurrency() {
    let newCurrency = '$'
    let coefficient = 1

    if (this.currency === "$") {
      newCurrency = "₽";
      coefficient = 90;
    } else if (this.currency === "₽") {
      newCurrency = "BYN";
      coefficient = 3.18;
    } else if (this.currency === 'BYN') {
      newCurrency = '€';
      coefficient = 0.91;
    } else if (this.currency === '€') {
      newCurrency = '¥';
      coefficient = 6.9;
    }
    this.currency = newCurrency

    this.productsData.forEach(item => {
      item.price = +(item.basePrice * coefficient).toFixed(2)
    })
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.confirmOrder(this.form.value)
      this.form.reset();
    }
  }
}

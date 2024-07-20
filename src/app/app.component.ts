import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Product} from "./app.model";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  currency: string = '$'
  loader: boolean = true
  loaderShowed: boolean = true;

  productsData: Product[] = [];

  form = this.fb.group({
    product: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })

  mainImageStyle: any
  orderImageStyle: any

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mainImageStyle = {
      transform: "translate(" + ((e.clientX * 0.3) / 8) + "px," + ((e.clientY * 0.3) / 8) + "px)"
    };
    this.orderImageStyle = {
      transform: "translate(-" + ((e.clientX * 0.3) / 8) + "px,-" + ((e.clientY * 0.3) / 8) + "px)"
    };
  }

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    setTimeout(()=>{
      this.loaderShowed = false;
    }, 1000)

    setTimeout(()=>{
      this.loader = false;
    }, 1500)

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

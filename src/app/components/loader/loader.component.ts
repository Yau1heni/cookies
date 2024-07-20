import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() loader!: boolean;
  @Input() loaderShowed!: boolean;

  constructor() {
  }
}

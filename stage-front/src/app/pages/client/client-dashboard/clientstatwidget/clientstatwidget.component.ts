import { Component } from '@angular/core';
import {Product} from "../../../service/product.service";

@Component({
  selector: 'app-clientstatwidget',
  imports: [],
  templateUrl: './clientstatwidget.component.html',
  styleUrl: './clientstatwidget.component.scss'
})
export class ClientstatwidgetComponent {
    products!: Product[];
}

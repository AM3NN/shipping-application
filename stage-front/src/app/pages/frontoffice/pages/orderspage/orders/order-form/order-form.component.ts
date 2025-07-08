import { Component, OnInit } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
    selector: 'app-order-form',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './order-form.component.html',
    styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
    orderForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.orderForm = this.fb.group({
            status: ['', Validators.required],
            shippingMethod: [''],
            shippingLocation: [''],
            deliveryLocation: [''],
            createdDate: [null, Validators.required],
            expectedDate: [null],
            closedDate: [null],
            reference: [''],
            type: [''],
            direction: [''],
            domain: [''],
            shippingCost: [null, Validators.min(0)],
            shippingCurrency: [''],
            discount: [null, Validators.min(0)],
            discountCurrency: [''],
            netAmount: [null, Validators.min(0)],
            netCurrency: [''],
            tax: [null, Validators.min(0)],
            taxCurrency: [''],
            totalAmount: [null, [Validators.required, Validators.min(0)]],
            totalCurrency: ['', Validators.required]
        });
    }

    submit() {
        if (this.orderForm.valid) {
            console.log('Form data:', this.orderForm.value);
            // TODO: send this.orderForm.value to your backend service here
        } else {
            this.orderForm.markAllAsTouched();
        }
    }
}

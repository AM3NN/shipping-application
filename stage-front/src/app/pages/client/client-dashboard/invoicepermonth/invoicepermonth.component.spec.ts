import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicepermonthComponent } from './invoicepermonth.component';

describe('InvoicepermonthComponent', () => {
  let component: InvoicepermonthComponent;
  let fixture: ComponentFixture<InvoicepermonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicepermonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicepermonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

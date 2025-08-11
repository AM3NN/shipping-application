import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderesclientComponent } from './orderesclient.component';

describe('OrderesclientComponent', () => {
  let component: OrderesclientComponent;
  let fixture: ComponentFixture<OrderesclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderesclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderesclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

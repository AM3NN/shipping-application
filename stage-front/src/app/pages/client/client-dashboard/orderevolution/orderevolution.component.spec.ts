import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderevolutionComponent } from './orderevolution.component';

describe('OrderevolutionComponent', () => {
  let component: OrderevolutionComponent;
  let fixture: ComponentFixture<OrderevolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderevolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderevolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

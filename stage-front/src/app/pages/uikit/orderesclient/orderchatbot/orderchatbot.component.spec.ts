import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderchatbotComponent } from './orderchatbot.component';

describe('OrderchatbotComponent', () => {
  let component: OrderchatbotComponent;
  let fixture: ComponentFixture<OrderchatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderchatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderchatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

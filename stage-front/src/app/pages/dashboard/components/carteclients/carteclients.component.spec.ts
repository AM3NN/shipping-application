import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteclientsComponent } from './carteclients.component';

describe('CarteclientsComponent', () => {
  let component: CarteclientsComponent;
  let fixture: ComponentFixture<CarteclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteclientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

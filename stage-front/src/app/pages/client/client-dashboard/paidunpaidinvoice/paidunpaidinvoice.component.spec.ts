import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidunpaidinvoiceComponent } from './paidunpaidinvoice.component';

describe('PaidunpaidinvoiceComponent', () => {
  let component: PaidunpaidinvoiceComponent;
  let fixture: ComponentFixture<PaidunpaidinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidunpaidinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidunpaidinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

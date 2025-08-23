import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvvalidatorComponent } from './csvvalidator.component';

describe('CsvvalidatorComponent', () => {
  let component: CsvvalidatorComponent;
  let fixture: ComponentFixture<CsvvalidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvvalidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvvalidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

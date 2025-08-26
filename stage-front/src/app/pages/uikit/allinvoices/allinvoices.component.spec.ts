import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllinvoicesComponent } from './allinvoices.component';

describe('AllinvoicesComponent', () => {
  let component: AllinvoicesComponent;
  let fixture: ComponentFixture<AllinvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllinvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

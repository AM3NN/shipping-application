import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientstatwidgetComponent } from './clientstatwidget.component';

describe('ClientstatwidgetComponent', () => {
  let component: ClientstatwidgetComponent;
  let fixture: ComponentFixture<ClientstatwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientstatwidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientstatwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

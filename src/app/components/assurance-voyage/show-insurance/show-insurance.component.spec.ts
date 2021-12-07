import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInsuranceComponent } from './show-insurance.component';

describe('ShowInsuranceComponent', () => {
  let component: ShowInsuranceComponent;
  let fixture: ComponentFixture<ShowInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsvContentComponent } from './asv-content.component';

describe('AsvContentComponent', () => {
  let component: AsvContentComponent;
  let fixture: ComponentFixture<AsvContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsvContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsvContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

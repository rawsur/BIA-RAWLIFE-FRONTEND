import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsvSidebarComponent } from './asv-sidebar.component';

describe('AsvSidebarComponent', () => {
  let component: AsvSidebarComponent;
  let fixture: ComponentFixture<AsvSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsvSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsvSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectCardComponent } from './admin-project-card.component';

describe('ProjectCardComponent', () => {
  let component: AdminProjectCardComponent;
  let fixture: ComponentFixture<AdminProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

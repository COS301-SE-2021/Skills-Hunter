import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPortalCardComponent } from './admin-portal-card.component';

describe('AdminPortalCardComponent', () => {
  let component: AdminPortalCardComponent;
  let fixture: ComponentFixture<AdminPortalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPortalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

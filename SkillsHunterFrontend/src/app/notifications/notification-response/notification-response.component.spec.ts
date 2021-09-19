import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationResponseComponent } from './notification-response.component';

describe('NotificationResponseComponent', () => {
  let component: NotificationResponseComponent;
  let fixture: ComponentFixture<NotificationResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

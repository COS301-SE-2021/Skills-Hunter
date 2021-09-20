import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsAndInvitationsRecruiterComponent } from './applications-and-invitations-recruiter.component';

describe('ApplicationsAndInvitationsRecruiterComponent', () => {
  let component: ApplicationsAndInvitationsRecruiterComponent;
  let fixture: ComponentFixture<ApplicationsAndInvitationsRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsAndInvitationsRecruiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsAndInvitationsRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

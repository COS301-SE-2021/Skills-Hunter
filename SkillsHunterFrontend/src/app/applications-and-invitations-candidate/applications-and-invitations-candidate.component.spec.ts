import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsAndInvitationsCandidateComponent } from './applications-and-invitations-candidate.component';

describe('ApplicationsAndInvitationsCandidateComponent', () => {
  let component: ApplicationsAndInvitationsCandidateComponent;
  let fixture: ComponentFixture<ApplicationsAndInvitationsCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsAndInvitationsCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsAndInvitationsCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

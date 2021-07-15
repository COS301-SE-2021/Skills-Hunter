import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCandidateComponent } from './match-candidate.component';

describe('MatchCandidateComponent', () => {
  let component: MatchCandidateComponent;
  let fixture: ComponentFixture<MatchCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

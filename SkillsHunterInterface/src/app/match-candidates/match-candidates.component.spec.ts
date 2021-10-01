import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCandidatesComponent } from './match-candidates.component';

describe('MatchCandidatesComponent', () => {
  let component: MatchCandidatesComponent;
  let fixture: ComponentFixture<MatchCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

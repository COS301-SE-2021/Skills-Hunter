import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillControlComponent } from './skill-control.component';

describe('SkillControlComponent', () => {
  let component: SkillControlComponent;
  let fixture: ComponentFixture<SkillControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

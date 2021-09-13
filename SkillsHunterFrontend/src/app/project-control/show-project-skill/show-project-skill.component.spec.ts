import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectSkillComponent } from './show-project-skill.component';

describe('ShowProjectSkillComponent', () => {
  let component: ShowProjectSkillComponent;
  let fixture: ComponentFixture<ShowProjectSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProjectSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

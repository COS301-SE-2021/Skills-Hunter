import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillAdvancedSearchComponent } from './skill-advanced-search.component';

describe('SkillAdvancedSearchComponent', () => {
  let component: SkillAdvancedSearchComponent;
  let fixture: ComponentFixture<SkillAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

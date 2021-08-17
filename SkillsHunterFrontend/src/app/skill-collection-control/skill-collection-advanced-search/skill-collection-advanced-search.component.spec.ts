import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCollectionAdvancedSearchComponent } from './skill-collection-advanced-search.component';

describe('SkillCollectionAdvancedSearchComponent', () => {
  let component: SkillCollectionAdvancedSearchComponent;
  let fixture: ComponentFixture<SkillCollectionAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillCollectionAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCollectionAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

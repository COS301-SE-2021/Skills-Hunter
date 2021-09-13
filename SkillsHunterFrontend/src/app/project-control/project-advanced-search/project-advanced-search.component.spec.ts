import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdvancedSearchComponent } from './project-advanced-search.component';

describe('ProjectAdvancedSearchComponent', () => {
  let component: ProjectAdvancedSearchComponent;
  let fixture: ComponentFixture<ProjectAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAdvancedSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

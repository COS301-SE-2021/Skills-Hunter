import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsCollectionComponent } from './add-skills-collection.component';

describe('AddSkillsCollectionComponent', () => {
  let component: AddSkillsCollectionComponent;
  let fixture: ComponentFixture<AddSkillsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillsCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

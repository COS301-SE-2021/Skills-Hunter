import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillCollectionComponent } from './add-skill-collection.component';

describe('AddSkillCollectionComponent', () => {
  let component: AddSkillCollectionComponent;
  let fixture: ComponentFixture<AddSkillCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

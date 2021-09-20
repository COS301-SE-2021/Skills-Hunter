import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCollectionComponent } from './skill-collection.component';

describe('SkillCollectionComponent', () => {
  let component: SkillCollectionComponent;
  let fixture: ComponentFixture<SkillCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

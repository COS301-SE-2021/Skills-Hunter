import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCollectionControlComponent } from './skill-collection-control.component';

describe('SkillCollectionControlComponent', () => {
  let component: SkillCollectionControlComponent;
  let fixture: ComponentFixture<SkillCollectionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillCollectionControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCollectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

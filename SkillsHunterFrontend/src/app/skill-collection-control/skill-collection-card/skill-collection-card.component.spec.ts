import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCollectionCardComponent } from './skill-collection-card.component';

describe('SkillCollectionCardComponent', () => {
  let component: SkillCollectionCardComponent;
  let fixture: ComponentFixture<SkillCollectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillCollectionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCollectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

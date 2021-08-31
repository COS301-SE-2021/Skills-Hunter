import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectCollectionComponent } from './show-project-collection.component';

describe('ShowProjectCollectionComponent', () => {
  let component: ShowProjectCollectionComponent;
  let fixture: ComponentFixture<ShowProjectCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProjectCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProjectCRUDService } from './project-crud.service';

describe('ProjectCRUDService', () => {
  let service: ProjectCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

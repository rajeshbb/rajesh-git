import { TestBed } from '@angular/core/testing';

import { AuthicationService } from './authication.service';

describe('AuthicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthicationService = TestBed.get(AuthicationService);
    expect(service).toBeTruthy();
  });
});

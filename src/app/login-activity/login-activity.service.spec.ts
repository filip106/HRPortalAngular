import { TestBed } from '@angular/core/testing';

import { LoginActivityService } from './login-activity.service';

describe('LoginActivityService', () => {
  let service: LoginActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

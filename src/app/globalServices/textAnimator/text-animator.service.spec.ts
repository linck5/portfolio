import { TestBed } from '@angular/core/testing';

import { TextAnimatorService } from './text-animator.service';

describe('TextAnimatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextAnimatorService = TestBed.get(TextAnimatorService);
    expect(service).toBeTruthy();
  });
});

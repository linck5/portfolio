import { TestBed } from '@angular/core/testing';

import { BackgroundCanvasService } from './background-canvas.service';

describe('BackgroundCanvasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundCanvasService = TestBed.get(BackgroundCanvasService);
    expect(service).toBeTruthy();
  });
});

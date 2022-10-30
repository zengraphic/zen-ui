import { TestBed } from '@angular/core/testing';

import { ZenUikitLibService } from './zen-uikit-lib.service';

describe('ZenUikitLibService', () => {
  let service: ZenUikitLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZenUikitLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

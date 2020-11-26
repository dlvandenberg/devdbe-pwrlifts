import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';

import { AppUpdateService } from './app-update.service';

describe('AppUpdateService', () => {
  let service: AppUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SwUpdate, ApplicationRef ]
    });
    const swUpdate = TestBed.inject(SwUpdate);
    const appRef = TestBed.inject(ApplicationRef);

    service = new AppUpdateService(appRef, swUpdate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

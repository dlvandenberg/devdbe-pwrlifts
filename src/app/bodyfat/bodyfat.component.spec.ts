import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyfatComponent } from './bodyfat.component';
import { BodyfatService } from './services/bodyfat.service';

describe('BodyfatComponent', () => {
  let component: BodyfatComponent;
  const bodyfatServiceMock: Partial<BodyfatService> = {
    fetchBodyfats(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: BodyfatService, useValue: bodyfatServiceMock }
      ]
    });
    const bodyfatService = TestBed.inject(BodyfatService);
    component = new BodyfatComponent(bodyfatService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bodyfats on initialization', () => {
    const fetch = spyOn(bodyfatServiceMock, 'fetchBodyfats');

    component.ngOnInit();

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

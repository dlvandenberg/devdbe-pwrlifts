import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyfatComponent } from './bodyfat.component';

describe('BodyfatComponent', () => {
  let component: BodyfatComponent;
  let fixture: ComponentFixture<BodyfatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyfatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyfatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

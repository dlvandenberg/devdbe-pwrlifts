import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOneRepMaxComponent } from './edit-one-rep-max.component';

describe('EditOneRepMaxComponent', () => {
  let component: EditOneRepMaxComponent;
  let fixture: ComponentFixture<EditOneRepMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOneRepMaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOneRepMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

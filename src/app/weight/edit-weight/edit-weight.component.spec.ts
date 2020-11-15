import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeightComponent } from './edit-weight.component';

describe('EditComponent', () => {
  let component: EditWeightComponent;
  let fixture: ComponentFixture<EditWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBodyfatComponent } from './edit-bodyfat.component';

describe('EditComponent', () => {
  let component: EditBodyfatComponent;
  let fixture: ComponentFixture<EditBodyfatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBodyfatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBodyfatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYouKnowComponent } from './edit-you-know.component';

describe('EditYouKnowComponent', () => {
  let component: EditYouKnowComponent;
  let fixture: ComponentFixture<EditYouKnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditYouKnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYouKnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYouKnowComponent } from './add-you-know.component';

describe('AddYouKnowComponent', () => {
  let component: AddYouKnowComponent;
  let fixture: ComponentFixture<AddYouKnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYouKnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYouKnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

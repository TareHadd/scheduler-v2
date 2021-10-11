import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerV2Component } from './datepicker-v2.component';

describe('DatepickerV2Component', () => {
  let component: DatepickerV2Component;
  let fixture: ComponentFixture<DatepickerV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

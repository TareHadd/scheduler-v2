import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerV2Component } from './scheduler-v2.component';

describe('SchedulerV2Component', () => {
  let component: SchedulerV2Component;
  let fixture: ComponentFixture<SchedulerV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

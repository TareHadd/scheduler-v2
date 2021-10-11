import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextViewingComponent } from './next-viewing.component';

describe('NextViewingComponent', () => {
  let component: NextViewingComponent;
  let fixture: ComponentFixture<NextViewingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextViewingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

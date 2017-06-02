import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegereComponent } from './legere.component';

describe('LegereComponent', () => {
  let component: LegereComponent;
  let fixture: ComponentFixture<LegereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

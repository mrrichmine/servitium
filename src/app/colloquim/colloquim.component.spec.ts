import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColloquimComponent } from './colloquim.component';

describe('ColloquimComponent', () => {
  let component: ColloquimComponent;
  let fixture: ComponentFixture<ColloquimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColloquimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColloquimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

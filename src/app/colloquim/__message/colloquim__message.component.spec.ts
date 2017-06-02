import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Colloquim__MessageComponent } from './colloquim__message.component';

describe('Colloquim__MessageComponent', () => {
  let component: Colloquim__MessageComponent;
  let fixture: ComponentFixture<Colloquim__MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Colloquim__MessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Colloquim__MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

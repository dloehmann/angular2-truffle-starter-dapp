import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRfaComponent } from './new-rfa.component';

describe('NewRfaComponent', () => {
  let component: NewRfaComponent;
  let fixture: ComponentFixture<NewRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

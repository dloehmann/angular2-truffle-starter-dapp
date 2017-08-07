import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrufflestarterComponent } from './trufflestarter.component';

describe('TrufflestarterComponent', () => {
  let component: TrufflestarterComponent;
  let fixture: ComponentFixture<TrufflestarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrufflestarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrufflestarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

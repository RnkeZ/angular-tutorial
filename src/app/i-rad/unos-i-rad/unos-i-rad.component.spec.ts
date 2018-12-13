import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosIRadComponent } from './unos-i-rad.component';

describe('UnosIRadComponent', () => {
  let component: UnosIRadComponent;
  let fixture: ComponentFixture<UnosIRadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnosIRadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosIRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

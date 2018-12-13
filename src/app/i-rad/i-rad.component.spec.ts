import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IRadComponent } from './i-rad.component';

describe('IRadComponent', () => {
  let component: IRadComponent;
  let fixture: ComponentFixture<IRadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IRadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

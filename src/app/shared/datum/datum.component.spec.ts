import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatumComponent } from './datum.component';

describe('DatumComponent', () => {
  let component: DatumComponent;
  let fixture: ComponentFixture<DatumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

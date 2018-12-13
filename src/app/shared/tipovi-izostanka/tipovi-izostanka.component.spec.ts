import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoviIzostankaComponent } from './tipovi-izostanka.component';

describe('TipoviIzostankaComponent', () => {
  let component: TipoviIzostankaComponent;
  let fixture: ComponentFixture<TipoviIzostankaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoviIzostankaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoviIzostankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

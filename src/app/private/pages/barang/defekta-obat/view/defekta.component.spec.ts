import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefektaComponent } from './defekta.component';

describe('DefektaComponent', () => {
  let component: DefektaComponent;
  let fixture: ComponentFixture<DefektaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefektaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicCastCalculatorComponent } from './magic-cast-calculator.component';

describe('MagicCastCalculatorComponent', () => {
  let component: MagicCastCalculatorComponent;
  let fixture: ComponentFixture<MagicCastCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicCastCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicCastCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

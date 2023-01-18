import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';

import { MortgageCalculatorComponent } from './mortgage-calculator.component';

describe('MortgageCalculatorComponent', () => {
  let component: MortgageCalculatorComponent;
  let fixture: ComponentFixture<MortgageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgageCalculatorComponent],
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatGridListModule,
        MatToolbarModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MortgageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call mortgageSummaryCalculation method from ngOnInit', () => {
    spyOn(component, 'mortgageSummaryCalculation');
    component.ngOnInit();
    expect(component.mortgageSummaryCalculation).toHaveBeenCalled();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    expect(component.mortgageCalculatorForm instanceof FormGroup).toBe(true);
  });

  it('mortgageCalculatorForm should be invalid for empty field', async () => {
    component.mortgageCalculatorForm.controls['mortgageAmount'].setValue('');
    component.mortgageCalculatorForm.controls['interestRate'].setValue('');
    component.mortgageCalculatorForm.controls['amortization'].setValue('');
    component.mortgageCalculatorForm.controls['paymentFrequency'].setValue('');
    expect(component.mortgageCalculatorForm.valid).toBeFalsy();
  });

  it('mortgageCalculatorForm should be valid', async () => {
    component.mortgageCalculatorForm.controls['mortgageAmount'].setValue('10000');
    component.mortgageCalculatorForm.controls['interestRate'].setValue('5');
    component.mortgageCalculatorForm.controls['amortization'].setValue('10');
    component.mortgageCalculatorForm.controls['paymentFrequency'].setValue('12');
    expect(component.mortgageCalculatorForm.valid).toBeTruthy();
  });
});

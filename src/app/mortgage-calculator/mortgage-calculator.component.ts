import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MortgageDataService } from '../shared/mortgage-data.service';

export interface Mortgage {
  mortgageAmount: number;
  interestRate: number;
  paymentFrequency: number;
  amortization: number;
}

export interface PaymentFrequency {
  name: string;
  value: number;
}

export interface SummaryData {
  category: string;
  term: number;
}

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.css'],
})
export class MortgageCalculatorComponent {
  private categoryColumn: string[] = this.mortgageDataService.getSummaryCategoryColumns();
  public description: string = this.mortgageDataService.getDescription();
  public summaryTableHeader: string[] = this.mortgageDataService.getSummaryTableHeaders();
  public amortizationYears: number[] = this.mortgageDataService.getAmortizationYears();
  public paymentFrequencyList: PaymentFrequency[] = this.mortgageDataService.getPaymentFrequencyList();
  public mortgageCalculatorForm: FormGroup = new FormGroup({
    mortgageAmount: new FormControl(100000, Validators.required),
    interestRate: new FormControl(5, Validators.required),
    paymentFrequency: new FormControl(12, Validators.required),
    amortization: new FormControl(5, Validators.required),
  });
  public dataSource: SummaryData[] = [];

  constructor(public mortgageDataService: MortgageDataService) { }

  ngOnInit() {
    this.mortgageSummaryCalculation(this.mortgageCalculatorForm.value);
  }

  mortgageSummaryCalculation({
    mortgageAmount,
    interestRate,
    paymentFrequency,
    amortization,
  }: Mortgage) {
    this.dataSource = []
    //calculate number of payments - e.g. 10 years * 12 months = 120 payments 
    const noOfPayments = amortization * paymentFrequency;
    // calculate interest based on payment frequency - e.g monthly interest rate for 10 years will be (5/12)/100  = 0.004166666666666667
    const calculatedInterestRate = (interestRate / paymentFrequency) / 100;
    //interest based on payment frequency for 10 years period will be Math.pow(1+0.004166666666666667,120)
    const interest = Math.pow(1 + calculatedInterestRate, noOfPayments);
    //If payment frequency is monthly then mortgage installment will be (0.0041666666666667 * 100000 * 1.6470094976902803)/0.6470094976902803
    const mortgagePayment = (
      (calculatedInterestRate * mortgageAmount * interest) /
      (interest - 1)
    );
    //Interest paid over the period of 10 years (1060.6551523907635 * 120)-100000
    const interestPayments = (
      mortgagePayment * noOfPayments -
      mortgageAmount
    );
    //final amount paid if amortization is of 10 years 127279.2
    const totalCost = (mortgageAmount + interestPayments);

    this.categoryColumn.forEach((el) => {
      switch (el) {
        case this.categoryColumn[0]:
          this.dataSource.push({ category: el, term: noOfPayments });
          break;

        case this.categoryColumn[1]:
          this.dataSource.push({ category: el, term: mortgagePayment });
          break;

        case this.categoryColumn[2]:
          this.dataSource.push({ category: el, term: mortgageAmount });
          break;

        case this.categoryColumn[3]:
          this.dataSource.push({ category: el, term: interestPayments });
          break;

        case this.categoryColumn[4]:
          this.dataSource.push({ category: el, term: totalCost });
          break;
      }
    });
  }
}

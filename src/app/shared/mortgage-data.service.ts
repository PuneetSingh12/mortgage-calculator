import { Injectable } from '@angular/core';
import { Constants } from '../shared/constants.ts/globalContants';


@Injectable({
  providedIn: 'root'
})
export class MortgageDataService {

  constructor() { }

  ngOnInit() {

  }

  //We could achieve the same by directly importing constants in our mortgage componenet 
  //I have done it through service injection In order to demonstrate how had we done if we were getting this data from backend

  getSummaryTableHeaders() {
    return Constants.summaryTableHeader;
  }

  getSummaryCategoryColumns() {
    return Constants.categoryColumn;
  }

  getAmortizationYears() {
    return Constants.amortizationYears;
  }

  getPaymentFrequencyList() {
    return Constants.paymentFrequencyList;
  }

  getDescription() {
    return Constants.description;
  }
}

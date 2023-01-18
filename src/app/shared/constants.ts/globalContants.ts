export class Constants {
  public static summaryTableHeader: string[] = ['category', 'term'];

  public static categoryColumn: string[] = [
    'No of Payments',
    'Mortgage Payment',
    'Principal Payments',
    'Interest Payments',
    'Total Cost',
  ];

  public static amortizationYears: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public static paymentFrequencyList = [
    { name: 'Weekly', value: 52 },
    { name: 'BiWeekly', value: 26 },
    { name: 'Monthly', value: 12 },
  ];

  public static description: string =
    'This calculator determines your mortgage payment and provides you with a mortgage payment schedule. The calculator also shows how much money and how many years you can save by making prepayments.';
}

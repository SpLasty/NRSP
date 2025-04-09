export class AdminReportsDto {
    readonly reportType: string;     // e.g., "transactions", "disputes", "analytics"
    readonly dateRangeStart?: Date;  
    readonly dateRangeEnd?: Date;   
  }
  
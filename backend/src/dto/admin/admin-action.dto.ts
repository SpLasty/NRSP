export class AdminActionDto {
    readonly actionType: string; // e.g., "banUser", "approveListing", "resolveDispute"
    readonly targetId: number;   // e.g., userId for ban or itemId for approval
    readonly details?: string;   // Optional notes or details about the action
  }
  
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class LenderService {
  constructor(private readonly dataSource: DataSource) {}

  async getBorrowRequestsForLender(lenderId: number) {
    const result = await this.dataSource.query(
      `SELECT br.id as "requestId", br.status, br."returnDueDate", br."requestDate",
              i.title, i.description, i."imageUrl", i.condition, i.category
       FROM borrow_request br
       JOIN item i ON br."itemId" = i.id
       WHERE i."lenderId" = $1
       ORDER BY br."requestDate" DESC`,
      [lenderId],
    );

    return result;
  }

  async updateBorrowRequestStatus(requestId: number, status: string) {
    await this.dataSource.query(
      `UPDATE borrow_request SET status = $1 WHERE id = $2`,
      [status, requestId],
    );
    return { message: 'Status updated' };
  }
}

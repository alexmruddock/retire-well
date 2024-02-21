import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { getXataClient } from "@/xata";

const xata = getXataClient();

async function getData() {
  // Fetch data from your API here.
  const payments = await xata.db.payments.getAll();
  return payments;
}

export default async function PaymentsPage() {
  const payments = await getData()

  const data: Payment[] = payments.map(payment => {
    if (!payment.amount || !payment.status || !payment.due_date || !payment.resident) {
      throw new Error('Invalid payment data');
    }
    return {
      id: payment.id,
      amount: payment.amount,
      // Asserting the type of status here
      status: payment.status as Payment['status'],
      dueDate: new Date(payment.due_date), // Ensuring dueDate is a Date object
      transactionDate: payment.transaction_date ? new Date(payment.transaction_date) : null, // Handling null or undefined transactionDate
      residentId: payment.resident.id,
    };
  })

  return (
    <>
      <div className="text-bold text-lg text-center py-5">
        <h1>Payments</h1>
      </div>
      <div className="container mx-auto py-5 items-center justify-normal">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}

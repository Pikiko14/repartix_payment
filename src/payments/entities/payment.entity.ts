export class PaymentEntity {
  subscription_id: string;
  payment_status: StatusPayment;
  external_id: string;
  date_pay?: Date;
  total: number;
}

export enum StatusPayment {
  cancelled = 'cancelled',
  aproved = 'aproved',
  pending = 'pending',
  in_process = 'in_process',
  in_mediation = 'in_mediation',
  rejected = 'rejected',
  refunded = 'refunded',
  chargedback = 'chargedback',
}

export enum PaymentMethods {
  mercadopago = 'mercadopago',
}

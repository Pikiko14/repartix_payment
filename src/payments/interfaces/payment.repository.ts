import { PaymentEntity } from "../entities/payment.entity";
import { CreatePaymentDto } from "../dto/create-payment.dto";


export interface IPaymentRepository {
  create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity | unknown>;
  
  find(params: { key: keyof PaymentEntity; value: any }): Promise<PaymentEntity | null>;
  
  update(id: string, payment: PaymentEntity): Promise<PaymentEntity | null>;
  
  delete(id: string): Promise<void>;
}

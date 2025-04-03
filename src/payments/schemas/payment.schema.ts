import {
  PaymentEntity,
  PaymentMethods,
  StatusPayment,
} from './../entities/payment.entity';
import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PaymentsDocument = HydratedDocument<PaymentEntity>;

@Schema({ autoIndex: true })
export class Payments {
  @Prop({ required: true, index: true })
  subscription_id: string;

  @Prop({ default: StatusPayment.pending })
  payment_status: StatusPayment;

  @Prop({ index: true, required: false })
  external_id: string;

  @Prop({ index: true, required: true })
  date_pay: Date;

  @Prop()
  total?: number;

  @Prop({ default: PaymentMethods.mercadopago })
  paymentMethods: PaymentMethods;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);

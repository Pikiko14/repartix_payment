
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { CreatePaymentDto } from '../dto/create-payment.dto';

// Interfaz común para todas las pasarelas de pago
export interface PaymentGateway {
  processPayment(order: CreatePaymentDto): Promise<PreferenceResponse>;
  getPaymentData(paymentId: any): Promise<PaymentResponse | void | any | string>;
}

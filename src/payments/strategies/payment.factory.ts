import { PaymentGateway } from "../interfaces/payment-gateway.interface";
import { MercadoPagoImplement } from "./implements/mercado-pago.implement";

export class PaymentFactory {
  static createPaymentGateway(gateway: string): PaymentGateway {
    switch (gateway.toLowerCase()) {
      case "mercadopago":
        return new MercadoPagoImplement();

      default:
        throw new Error("Payment gateway don't support.");
    }
  }
}

import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { PaymentGateway } from "../../interfaces/payment-gateway.interface";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { envs } from "src/configuration";
import { CreatePaymentDto } from "src/payments/dto/create-payment.dto";

// Implementación para MercadoPago
export class MercadoPagoImplement implements PaymentGateway {
  client: MercadoPagoConfig;
  preference: Preference;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: envs.m_pago_private,
    });
    this.preference = new Preference(this.client);
  }

  /**
   * Create payment instance on mercadopago
   * @param order
   * @returns
   */
  async processPayment(paymentDto: CreatePaymentDto): Promise<PreferenceResponse> {
    const items = [
      {
        id: paymentDto.subscription_id,
        title: `Pago del plan ${paymentDto.subscription_id}`,
        quantity: 1,
        unit_price: paymentDto.total,
      }
    ];
    console.log(paymentDto);

    const createPreference = await this.preference.create({
      body: {
        items: items,
        payer: {
          name: paymentDto.user.fullname,
          email: paymentDto.user.email,
          phone: {
            area_code: "57",
            number: paymentDto.user?.phone.split(" ").join("") || '',
          },
        },
        back_urls: {
          success: `${envs.app_url}/orden-de-compra/${
            paymentDto.subscription_id
          }/approved`,
          pending: `${envs.app_url}/orden-de-compra/${
            paymentDto.subscription_id
          }/pending`,
          failure: `${envs.app_url}/orden-de-compra/${
            paymentDto.subscription_id
          }/fail`,
        },
        external_reference: paymentDto.subscription_id,
        payment_methods: {
          installments: 1,
        },
        notification_url: envs.mercado_pago_webhook
      },
    });

    return createPreference;
  }

  /**
   * Get payment data
   * @param paymentId
   */
  async getPaymentData(paymentId: any): Promise<PaymentResponse> {
    try {
      const payment = new Payment(this.client);

      const paymentData = await payment.get({
        id: paymentId,
      });

      if (paymentData.id) {
        return paymentData;
      }
      return paymentData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

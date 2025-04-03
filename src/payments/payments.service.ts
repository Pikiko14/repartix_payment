import { RpcException } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentFactory } from './strategies/payment.factory';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from './repositories/payment.repository';

@Injectable()
export class PaymentsService {
  statusAvailable: any = {
    cancelled: "cancelled",
    aproved: "aproved",
    pending: "pending",
    in_process: "in_process",
    in_mediation: "in_mediation",
    rejected: "rejected",
    refunded: "refunded",
    chargedback: "chargedback",
  };
  

  constructor(@Inject() private readonly repository: PaymentRepository) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const paymentGateway = PaymentFactory.createPaymentGateway(
      createPaymentDto.paymentMethods,
    );
    try {
      // generate references
      const paymentPreference =
        await paymentGateway.processPayment(createPaymentDto);
      
      if (!paymentPreference.id) {
        throw new RpcException({
          message: 'Error creating payment reference',
          status: HttpStatus.UNPROCESSABLE_ENTITY,
        });
      }

      // save payment
      createPaymentDto.external_id = paymentPreference.id;
      await this.repository.create(createPaymentDto);

      // return
      return paymentPreference?.init_point || null;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async validatePayment(paymentId: string): Promise<void> {
    const paymentGateway = PaymentFactory.createPaymentGateway(
      'mercadopago',
    );
    const paymentData = await paymentGateway.getPaymentData(paymentId);

    // validate order status
    const {
      external_reference,
      status,
      status_detail,
      money_release_status,
    } = paymentData;

    console.log(external_reference, status, status_detail, money_release_status);

    if (!external_reference)
      return;

    // get payment and set status
    const payment = await this.repository.find({ key: 'subscription_id', value: external_reference });

    if (!payment)
      return;

    payment.payment_status = status;
    await this.repository.update(payment._id, payment);

    // send notification
    if (payment && status === 'approved' && status_detail === 'accredited') {
    }
  }
}

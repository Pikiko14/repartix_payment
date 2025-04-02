import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentFactory } from './strategies/payment.factory';

@Injectable()
export class PaymentsService {
  constructor() {}

  async create(createPaymentDto: CreatePaymentDto) {
    const paymentGateway = PaymentFactory.createPaymentGateway(createPaymentDto.paymentMethods);
    try {
      const paymentPreference = await paymentGateway.processPayment(createPaymentDto);
      return paymentPreference?.init_point || null;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }
}

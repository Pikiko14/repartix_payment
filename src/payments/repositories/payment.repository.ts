import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Payments } from '../schemas/payment.schema';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PaymentEntity } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { IPaymentRepository } from '../interfaces/payment.repository';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectModel(Payments.name) private readonly model: Model<Payments>,
  ) {}

  /**
   * Create payment
   * @param createPaymentDto
   * @returns { PaymentEntity | unknown }
   */
  async create(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity | unknown> {
    try {
      return (await this.model.create(createPaymentDto)) as any;
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Find by key
   * @param params
   * @returns { PaymentEntity | unknown }
   */
  async find(params: {
    key: keyof PaymentEntity;
    value: any;
  }): Promise<PaymentEntity | null> {
    try {
      return await this.model.findOne({ [params.key]: params.value });
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Update payment
   * @param id 
   * @param payment 
   * @returns { PaymentEntity | null }
   */
  async update(
    id: string,
    payment: PaymentEntity,
  ): Promise<PaymentEntity | null> {
    try {
      return await this.model.findByIdAndUpdate(id, payment, { new: true });
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  /**
   * Delete payment
   * @param id 
   */
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

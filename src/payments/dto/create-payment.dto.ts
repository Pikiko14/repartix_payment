import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethods, StatusPayment } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsMongoId()
  subscription_id: string;

  @IsOptional()
  @IsEnum(StatusPayment)
  payment_status?: StatusPayment;

  @IsOptional()
  @IsString()
  external_id;

  @IsString()
  date_pay: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  total: number;

  @IsNotEmpty()
  @IsString()
  paymentMethods?: string;
}

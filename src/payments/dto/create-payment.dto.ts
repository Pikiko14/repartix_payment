import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { StatusPayment } from '../entities/payment.entity';

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

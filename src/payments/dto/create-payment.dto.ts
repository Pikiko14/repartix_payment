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
import { UserSubscriptionDto } from 'src/subscription/dto/user-subscription.dto';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsMongoId()
  subscription_id: string;

  @IsEnum(StatusPayment)
  payment_status?: StatusPayment;

  @IsNotEmpty()
  @IsString()
  external_id;

  @IsOptional()
  @IsDate()
  date_pay: string;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsNotEmpty()
  @IsObject()
  @Type(() => UserSubscriptionDto)
  user: UserSubscriptionDto;

  @IsEnum(PaymentMethods)
  paymentMethods?: PaymentMethods;
}

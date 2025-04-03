import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payments, PaymentsSchema } from './schemas/payment.schema';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payments.name,
        schema: PaymentsSchema,
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository],
  exports: [PaymentsService],
})
export class PaymentsModule {}

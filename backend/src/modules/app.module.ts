import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AirQualityModule } from './air-quality/air-quality.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/airquality',
    ),
    AirQualityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

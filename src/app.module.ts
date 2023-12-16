import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NutService } from './nut.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [    ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, NutService],
})
export class AppModule {}

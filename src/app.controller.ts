import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NutService } from './nut.service';
import { Cron, CronExpression  } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly nutService: NutService,
    private readonly httpService: HttpService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async g(){
    this.nutService.getDev()
    console.log("THIS CRON")
    const x = await this.httpService.post('http://10.100.102.17:7125/server/info')
    console.log("THIS CRON", x)

  }



}

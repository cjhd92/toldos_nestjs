import { Module } from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToldosModule } from './toldos/toldos.module';
import { PdfService } from './pdf/pdf.service';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://cjhd92:cesar123@cluster0.cuuq5et.mongodb.net/Toldos?retryWrites=true&w=majority&appName=Cluster0'),ToldosModule],
  //imports: [MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}.cuuq5et.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`),ToldosModule],
  controllers: [AppController],
  providers: [AppService, PdfService],
})
export class AppModule {}

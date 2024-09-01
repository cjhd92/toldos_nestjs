import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Presupuesto,PresupuestoSchema } from './schemas/toldos.schemas';
import { ToldosService } from './toldos.service';
import { ToldosController } from './toldos.controller';
import { PdfService } from 'src/pdf/pdf.service';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name:Presupuesto.name,
            schema:PresupuestoSchema,
        }])

    ],
    providers: [ToldosService,PdfService],
    controllers: [ToldosController]
})
export class ToldosModule {}

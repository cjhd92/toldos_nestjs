import { Controller, Post, Body,Get, Res,Query } from '@nestjs/common';
import { ToldosService } from './toldos.service';

import { Response } from 'express';
import { PdfService } from '../pdf/pdf.service';


@Controller('toldos')
export class ToldosController {

    constructor(private presupuestoService:ToldosService,private readonly pdfService: PdfService ) {}

    @Post()
    async create(@Body() data:any){
       
        
        return this.presupuestoService.create_presupuesto(data);



    }

    @Get('download-pdf')
    async downloadPdf(@Res() res: Response) {
        // Datos que se pasarán al script de Python
        /* const data = {
        presupuesto_id: 'P001',
        cliente: 'Cliente Ejemplo',
        localidad: 'Localidad Ejemplo',
        telefono: '+34 123 456 789',
        // Otros datos necesarios...
        }; */

        const data = this.presupuestoService.getLastPresupuesto()
        console.log(data)

        try {
            const pdfBuffer = await this.pdfService.generarPdf(data);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=pedido.pdf');
            res.send(pdfBuffer);
        } 
        catch (error) {
            console.error('Error al procesar la solicitud de descarga del PDF:', error);
            res.status(500).send('Error al generar el PDF desde el controlador');
        }
    }

    @Get('nombreOperarioFecha')
    async getFilteredDocuments(
        @Query('operario') operario: string
    ) {
        return this.presupuestoService.getDocumentsByOperarioAndDate(operario);
    }
   /*  @Get('filtro')
    async getFilteredDocuments(
        @Query('operario') operario: string,
        @Query('fecha') fecha: string,
    ) {
        return this.presupuestoService.getDocumentsByOperarioAndDate(operario, fecha);
    } */


    @Get('nombreOperarioAllFecha')
    async getDocumentsByOperario(@Query('operario') operario: string) {
        return this.presupuestoService.getDocumentsByOperario(operario);
  }

}

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

    /* @Get('download-pdf')
    async downloadPdf(@Res() res: Response) {
        

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
    } */

        @Get('download-pdf')
  async downloadPdf(
    @Query('numero_presupuesto') numeroPresupuesto: string, // Obtener el número de presupuesto desde la query
    @Res() res: Response,
  ) {
    try {
      // Buscar el presupuesto correspondiente
      const data = await this.presupuestoService.getPresupuestoByNumero(
        numeroPresupuesto,
      );

      if (!data) {
        // Manejar el caso en que no se encuentre el presupuesto
        res.status(404).send('Presupuesto no encontrado');
        return;
      }

      // Generar el PDF utilizando los datos del presupuesto
      const pdfBuffer = await this.pdfService.generarPdf(data);

      // Configurar los encabezados de la respuesta para enviar el PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=presupuesto_${numeroPresupuesto}.pdf`,
      );
      res.send(pdfBuffer); // Enviar el PDF como respuesta
    } catch (error) {
      console.error(
        'Error al procesar la solicitud de descarga del PDF:',
        error,
      );
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

    @Get('nombreOperarioAllFecha')
    async getDocumentsByOperarioPresupuesto(
        @Query('operario') operario: string,
        @Query('presupuesto') presupuesto: string,
    ) {
        return this.presupuestoService.getDocumentsByOperarioAndpresupuesto(operario, presupuesto);
    } 

}

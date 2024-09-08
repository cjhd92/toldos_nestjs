import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Presupuesto } from './schemas/toldos.schemas';

import { Model } from 'mongoose';
import { calcularPrecio,calcularPrecioTejadillo,calcularPrecioMotor, calcularPrecioFaldon } from '../util/recto_normal.util';



@Injectable()
export class ToldosService {

  private lastPresupuesto: any;



  constructor(
    @InjectModel(Presupuesto.name) private presupuestoModel: Model<Presupuesto>) { }


  async create_presupuesto(presupuesto: any) {


    // Obtener el último presupuesto creado, ordenado por _id descendente
    
    presupuesto.numero_presupuesto = await this.numero_presupuesto();



    const presupuestoCreado = new this.presupuestoModel(presupuesto);


    const { linea, brazo, tejadillo,tipo_motor,tipo_faldon,medidas_faldon,descuento } = presupuestoCreado;
    const price_toldo = calcularPrecio(linea, brazo);

    // Asigna el precio calculado al campo `precio_toldo`
    presupuestoCreado.precio_toldo = price_toldo;

  
    const price_tejadillo = calcularPrecioTejadillo(tejadillo);
    presupuestoCreado.precio_tejadillo = price_tejadillo;


    const price_motor = calcularPrecioMotor(tipo_motor);
    presupuestoCreado.precio_motor = price_motor;

    const use_faldon = calcularPrecioFaldon(tipo_faldon, medidas_faldon)

    if(use_faldon == false){

      presupuestoCreado.tipo_faldon = "Sin Faldon";
      presupuestoCreado.medidas_faldon = 0;


    }


    const sin_descuento = price_toldo + price_tejadillo + price_motor;
    presupuestoCreado.precio_total_sin_descuento = sin_descuento;

    if(descuento > 0){
      
      const con_descuento = sin_descuento*descuento/100
      presupuestoCreado.precio_total_con_descuento = sin_descuento - con_descuento

    }

    else{

      presupuestoCreado.precio_total_con_descuento = sin_descuento;


    }

 


      

    
    
    

    // Imprime en consola el objeto modificado para verificar
    console.log(presupuestoCreado);
    this.lastPresupuesto = presupuestoCreado;

    return presupuestoCreado.save();

  }


  async numero_presupuesto(){

    const ultimoPresupuesto = await this.presupuestoModel
      .findOne({})
      .sort({ _id: -1 })
      .exec();


      // Generar el nuevo ID del presupuesto
    let nuevoId;
    if (ultimoPresupuesto) {
      const ultimoId = ultimoPresupuesto.numero_presupuesto;
      const numeroConsecutivo = parseInt(ultimoId.slice(1)) + 1;
      nuevoId = 'P' + numeroConsecutivo.toString().padStart(3, '0');
    } else {
      nuevoId = 'P001';
    }

    // Asignar el nuevo ID al presupuesto
    return nuevoId;
  }


    getLastPresupuesto(): any {
      return this.lastPresupuesto;
    }

    async getDocumentsByOperarioAndDate(operario: string) {
      console.log(operario);
    
      try {
        // Obtener la fecha actual del servidor
        const now = new Date();
        
        // Establecer el inicio del día (00:00:00.000) y el fin del día (23:59:59.999)
        const startDate = new Date(now);
        startDate.setUTCHours(0, 0, 0, 0);
    
        const endDate = new Date(now);
        endDate.setUTCHours(23, 59, 59, 999);
    
        console.log('Fecha de inicio:', startDate);
        console.log('Fecha de fin:', endDate);
    
        // Realizar la consulta
        const resultados = await this.presupuestoModel.find({
          operario: operario,
          fecha_presupuesto: {
            $gte: startDate,
            $lt: endDate,
          },
        }).exec();
    
        if (resultados.length === 0) {
          console.log('No se encontraron resultados.');
        }
    
        return resultados;
      } catch (error) {
        console.error('Error en la consulta:', error);
        throw error; // Propaga el error para que sea manejado por NestJS
      }
    }
    

//bien
    /* async getDocumentsByOperarioAndDate(operario: string, fecha: string) {

      console.log(operario)
      console.log(fecha)
      try {
        const startDate = new Date(fecha);
        startDate.setUTCHours(0, 0, 0, 0); // Inicio del día
        
        const endDate = new Date(fecha);
        endDate.setUTCHours(23, 59, 59, 999); // Fin del día
        

        const resultados = await this.presupuestoModel.find({
          operario: operario,
          fecha_presupuesto: {
            $gte: startDate,
            $lt: endDate,
          },
        }).exec();
    
        if (resultados.length === 0) {
          console.log('No se encontraron resultados.');
        }
    
        return resultados;
      } catch (error) {
        console.error('Error en la consulta:', error);
        throw error; // Propaga el error para que sea manejado por NestJS
      }
    } */
    

    async getDocumentsByOperario(operario: string) {
      return this.presupuestoModel.find({ operario:  operario }).exec();
    }

    async getDocumentsByOperarioAndpresupuesto(operario:string, presupuesto:string){

      return this.presupuestoModel
      .find({ operario: operario, numero_presupuesto: presupuesto })
      .exec();
  }

    }




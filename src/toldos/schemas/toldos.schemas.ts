import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Presupuesto {

    // Añadir el campo de fecha para registrar cuando se realiza el presupuesto



    @Prop({ required: true })
    nombre_cliente: string;

    @Prop({ required: true })
    direccion: string;

    @Prop({ required: true })
    telefono: string;

    @Prop({ required: true })
    tipo_toldo: string;

    @Prop({ required: true, min: 1.5, max: 6 })  // Valor mínimo 1.5, valor máximo 6
    linea: number;

    @Prop({ required: true, min: 0.8, max: 1.5 })  // Valor mínimo 0.8, valor máximo 1.5
    brazo: number;


    @Prop({ required: false, min: 0 })
    tejadillo?: number;

    @Prop({ required: false })
    tipo_motor?: string;

    @Prop({ required: false })
    tipo_faldon?: string;

    @Prop({ required: false })
    medidas_faldon?: number;

    @Prop({ required: true , default: 0})
    descuento: number;

    // Añadir el campo para el precio del toldo, pero no requerido
    @Prop({ required: false })
    precio_toldo?: number;

    @Prop({ default: Date.now })  // Usar Date.now como valor predeterminado
    fecha_presupuesto: Date;

    @Prop({ required: false })  // Usar Date.now como valor predeterminado
    numero_presupuesto?: string;

    // Añadir el campo para el precio del tejadillo, pero no requerido
    @Prop({ required: false })
    precio_tejadillo?: number;

    // Añadir el campo para el precio del motor, pero no requerido
    @Prop({ required: false })
    precio_motor?: number;
    
    // Añadir el campo para el precio del faldon, pero no requerido
    @Prop({ required: false, default: 0 })
    precio_faldon?: number;

    // Añadir el campo para el precio de todo sin descuento, pero no requerido
    @Prop({ required: false, default: 0 })
    precio_total_sin_descuento?: number;
    
    // Añadir el campo para el precio de todo con descuento, pero no requerido
    @Prop({ required: false, default: 0 })
    precio_total_con_descuento?: number;





}



export const PresupuestoSchema = SchemaFactory.createForClass(Presupuesto);
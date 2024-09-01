export const precios = {
    1.50: { 0.80: 370, 1.00: 400, 1.20: 408, 1.40: 434, 1.50: 460 },
    1.75: { 0.80: 380, 1.00: 406, 1.20: 430, 1.40: 448, 1.50: 478 },
    2.00: { 0.80: 394, 1.00: 424, 1.20: 438, 1.40: 464, 1.50: 488 },
    2.25: { 0.80: 408, 1.00: 438, 1.20: 452, 1.40: 480, 1.50: 504 },
    2.50: { 0.80: 440, 1.00: 476, 1.20: 494, 1.40: 526, 1.50: 556 },
    2.75: { 0.80: 460, 1.00: 494, 1.20: 504, 1.40: 534, 1.50: 568 },
    3.00: { 0.80: 468, 1.00: 504, 1.20: 514, 1.40: 548, 1.50: 582 },
    3.25: { 0.80: 482, 1.00: 518, 1.20: 528, 1.40: 560, 1.50: 616 },
    3.50: { 0.80: 494, 1.00: 530, 1.20: 544, 1.40: 580, 1.50: 628 },
    3.75: { 0.80: 552, 1.00: 598, 1.20: 616, 1.40: 666, 1.50: 698 },
    4.00: { 0.80: 572, 1.00: 600, 1.20: 626, 1.40: 670, 1.50: 708 },
    4.25: { 0.80: 578, 1.00: 618, 1.20: 642, 1.40: 688, 1.50: 730 },
    4.50: { 0.80: 584, 1.00: 626, 1.20: 652, 1.40: 696, 1.50: 738 },
    4.75: { 0.80: 602, 1.00: 656, 1.20: 682, 1.40: 722, 1.50: 768 },
    5.00: { 0.80: 656, 1.00: 704, 1.20: 744, 1.40: 794, 1.50: 846 },
    5.25: { 0.80: 676, 1.00: 726, 1.20: 750, 1.40: 806, 1.50: 860 },
    5.50: { 0.80: 704, 1.00: 760, 1.20: 782, 1.40: 834, 1.50: 880 },
    5.75: { 0.80: 732, 1.00: 778, 1.20: 812, 1.40: 854, 1.50: 898 },
    6.00: { 0.80: 780, 1.00: 838, 1.20: 884, 1.40: 914, 1.50: 936 },
};

const precios_tejadillo = {
    4.0: 450,
    5.0: 550,
    6.0: 620,
    7.0: 700,
}



export function calcularPrecio(linea: number, brazo: number): number {

    const lineasDisponibles = [1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6]
    const brazosDisponibles = [0.8, 1, 1.2, 1.4, 1.5]


    //const lineaSeleccionada = seleccionarProximoValorDisponible(linea, lineasDisponibles);
    const lineaSeleccionada = obtenerNumeroOProximoSuperior(linea, lineasDisponibles)


    //const brazoSeleccionado = seleccionarProximoValorDisponible(brazo, brazosDisponibles);
    const brazoSeleccionado = obtenerNumeroOProximoSuperior(brazo, brazosDisponibles)


    return precios[lineaSeleccionada][brazoSeleccionado];

}




function obtenerNumeroOProximoSuperior(numero: number, lista: number[]): number {
    // Ordenamos la lista por si acaso no estuviera ordenada
    lista.sort((a, b) => a - b);

    // Buscamos el índice del número o el próximo superior
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] >= numero) {


            return lista[i];
        }
    }

    // Si no encontramos un número mayor o igual, devolvemos undefined o podríamos lanzar un error.
    throw new Error('No se encontró un número en la lista que sea igual o superior al proporcionado.');
}



export function calcularPrecioTejadillo(tejadillo: number): number{

    const medidasDisponibles = [4,5,6,7]

    if(tejadillo > 3 && tejadillo < 8 ){
        const medidaSeleccionada = obtenerNumeroOProximoSuperior(tejadillo, medidasDisponibles);
        return precios_tejadillo[medidaSeleccionada];
  
      }
      else{
        const price_tejadillo = 0
        return price_tejadillo;
      }

   

    
}


export function calcularPrecioMotor(tipo:string): number {

    if (tipo === 'Mando') {
        return 440;
    } else if (tipo === 'Pulsador') {
        return 200;
    } else {
        return 0; // Para 'sin motor' u otros valores
    }

}
export function calcularPrecioFaldon(tipo:string,medida:number): boolean {
    
    if (medida > 0 && tipo === 'Recto') {
        return true;
    }
    if (medida > 0 && tipo === 'Ondulado') {
        return true;
    }
    if (medida === 0 || tipo === 'Sin Faldon') {
        return false;
    }
    // Puedes agregar más condiciones según sea necesario
    return false;

}
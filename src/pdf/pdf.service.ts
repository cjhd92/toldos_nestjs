import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';

@Injectable()
export class PdfService {
  private readonly execFile = promisify(execFile);

  async generarPdf(data: any): Promise<Buffer> {
    console.log(data)
    const scriptPath = 'src/pdf/generate_pdf.py'; 

    // Verifica si el script existe antes de ejecutarlo
    if (!existsSync(scriptPath)) {
      throw new Error(`El script de Python no existe en la ruta: ${scriptPath}`);
    }

    try {
      const { stdout, stderr } = await this.execFile('python', [scriptPath, JSON.stringify(data)]);
      
      if (stderr) {
        console.error('Error en la ejecución del script de Python:', stderr);
        throw new Error(stderr);
      }

      const pdfBuffer = Buffer.from(stdout, 'latin1');
      return pdfBuffer;
    } catch (error) {
      console.error('Error al generar el PDF:', error.message);
      throw new Error('Error al generar el PDF: ' + error.message);
    }
  }
}

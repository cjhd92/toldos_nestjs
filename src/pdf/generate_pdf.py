from fpdf import FPDF
import sys
import json

def generate_pdf(data):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=12)

    pdf.image('D:/Curso/Jorge/Usando Nestjs/nest_mongo_toldo/nests-toldos-api/assets/logo.png', 10, 8, 33, 25)  # Asegúrate de usar la ruta correcta al logo
    #pdf.cell(200, 10, txt=f"Presupuesto ({'numero_presupuesto'}/2024)", ln=True, align='C')
    pdf.cell(200, 10, text=f"Presupuesto ({data['numero_presupuesto']}/2024)", new_x="LMARGIN", new_y="NEXT", align='C')

    pdf.set_xy(10, 40)
    left_column_width = 90
    right_column_width = 90

    pdf.set_x(10)
    pdf.cell(left_column_width, 10, 'Solares Valencia (Empresa)', 0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.cell(left_column_width, 10, 'Jorge Luis Gonzalez Ordaz', 0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.cell(left_column_width, 10, 'Ave.Cuartel 7,puerta 13. CP:46770', 0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.cell(left_column_width, 10, 'Xeraco Playa, Valencia', 0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.cell(left_column_width, 10, 'NIF: Y69018187Z', 0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.cell(left_column_width, 10, 'Telefono: +34 611 078 238', 0, new_x="LMARGIN", new_y="NEXT", align='L')

    pdf.set_xy(100, 40)
    pdf.cell(right_column_width, 10, 'Presupuestar:', 0, new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.set_xy(100, 50)
    pdf.cell(right_column_width, 10, f"{data['nombre_cliente']}", new_x="LMARGIN", new_y="NEXT", align='L')

    pdf.set_xy(100, 60)
    pdf.cell(right_column_width, 10, f"{data['direccion']}", new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.set_xy(100, 70)
    

    pdf.line(10, 118, 180, 118)

    pdf.set_xy(10, 125)

    left_column_width = 90
    right_column_width = 90

    pdf.cell(right_column_width, 10, f"Fecha de presupuesto:  {data['fecha_presupuesto']}", new_x="LMARGIN", new_y="NEXT", align='L')
    pdf.set_xy(100, 125)

    pdf.cell(right_column_width, 10, 'Forma de pago:     A Definir',new_x="LMARGIN", new_y="NEXT", align='L')

    x_inicio = 10
    y_inicio = 150
    ancho_descripcion = 90
    ancho_ud = 20
    ancho_precio = 30
    ancho_total = 30

    pdf.set_xy(x_inicio, y_inicio)

    pdf.cell(ancho_descripcion, 10, 'DESCRIPCIÓN', border='TB', new_x="RIGHT", new_y="TOP")
    pdf.cell(ancho_ud, 10, 'UD', border='TB', new_x="RIGHT", new_y="TOP")
    pdf.cell(ancho_precio, 10, 'PRECIO', border='TB', new_x="RIGHT", new_y="TOP")
    pdf.cell(ancho_total, 10, 'TOTAL', border='TB', new_x="LMARGIN", new_y="NEXT")
    y_inicio += 10

    pdf.set_xy(x_inicio, y_inicio)

    pdf.cell(ancho_descripcion, 10, 'Toldos Punto Recto Normal', border='0', new_x="RIGHT", new_y="TOP")
    y_inicio += 10
    pdf.set_xy(x_inicio, y_inicio)

    pdf.cell(ancho_descripcion, 10, f"Linea: {data['linea']} x Brazo: {data['brazo']}", border=0, new_x="RIGHT", new_y="TOP")
    pdf.cell(ancho_ud, 10, '1', border=0, ln=0)
    pdf.cell(ancho_precio, 10, f"{data['precio_toldo']} EUR", border=0, new_x="RIGHT", new_y="TOP")
    pdf.cell(ancho_total, 10, f"{data['precio_toldo']} EUR", border=0, new_x="LMARGIN", new_y="NEXT")

    if data['precio_tejadillo'] != 0:
        y_inicio += 8
        pdf.set_xy(x_inicio, y_inicio)
        pdf.cell(ancho_descripcion, 10, f"Tejadillo: {data['tejadillo']} m", border=0, new_x="RIGHT", new_y="TOP")
        pdf.cell(ancho_ud, 10, '1', border=0, new_x="RIGHT", new_y="TOP")
        pdf.cell(ancho_precio, 10, f"{data['precio_tejadillo']} EUR", border=0, new_x="RIGHT", new_y="TOP")
        pdf.cell(ancho_total, 10, f"{data['precio_tejadillo']} EUR", border=0, new_x="LMARGIN", new_y="NEXT")

    if data['precio_motor'] != 0:
        y_inicio += 8
        pdf.set_xy(x_inicio, y_inicio)
        pdf.cell(ancho_descripcion, 10, f"Motor: {data['tipo_motor']}", border=0, ln=0)
        pdf.cell(ancho_ud, 10, '1', border=0, ln=0)
        pdf.cell(ancho_precio, 10, f"{data['precio_motor']} EUR", border=0, ln=0)
        pdf.cell(ancho_total, 10, f"{data['precio_motor']} EUR", border=0, ln=1)

    if data['tipo_faldon'] != 'Sin Faldon':
        y_inicio += 8
        pdf.set_xy(x_inicio, y_inicio)
        pdf.cell(ancho_descripcion, 10, f"Faldon: {data['tipo_faldon']} de {data['medidas_faldon']} m", border=0, ln=0)
        pdf.cell(ancho_ud, 10, '1', border=0, ln=0)
        pdf.cell(ancho_precio, 10, f"{data['precio_faldon']} EUR", border=0, ln=0)
        pdf.cell(ancho_total, 10, f"{data['precio_faldon']} EUR", border=0, ln=1)

    y_inicio += 30
    pdf.line(10, y_inicio, 180, y_inicio)

    y_inicio += 8
    pdf.set_xy(x_inicio, y_inicio)
    pdf.cell(left_column_width, 10, f'Con la aprobación del presupuesto el', border=0, ln=0)
    pdf.set_xy(120, y_inicio)
    pdf.cell(right_column_width, 10, f"Sub - Total      {data['precio_total_con_descuento']} EUR", border=0, ln=0)

    y_inicio += 6
    iva = data['precio_total_con_descuento'] * 0.21
    iva = round(iva, 2)

    pdf.set_xy(x_inicio, y_inicio)
    pdf.cell(left_column_width, 10, f'cliente debe abonar el 50% del monto ', border=0, ln=0)
    pdf.set_xy(120, y_inicio)
    pdf.cell(right_column_width, 10, f'IVA 21%          {iva:.2f} EUR', border=0, ln=0)
    total_con_iva = iva + data['precio_total_con_descuento']
    total_con_iva = round(total_con_iva, 2)
    y_inicio += 6
    pdf.set_xy(x_inicio, y_inicio)
    pdf.cell(left_column_width, 10, f'total en calidadde reserva y fabricación.', border=0, ln=0)
    pdf.set_xy(120, y_inicio)

    pdf.cell(right_column_width, 10, f'TOTAL            {total_con_iva} EUR', border=0, ln=0)
    y_inicio += 6
    pdf.set_xy(x_inicio, y_inicio)
    pdf.cell(left_column_width, 10, f'IBAN: ES18 0182 2741 1102 0160 5004', border=0, ln=0)

    
    file_path = f"D:/Curso/Jorge/Usando Nestjs/nest_mongo_toldo/nests-toldos-api/pedido_{data['numero_presupuesto']}.pdf"
    pdf.output(file_path)

    # Devuelve el contenido del PDF como respuesta
    pdf_content = pdf.output()
    return pdf_content

if __name__ == "__main__":
    data = json.loads(sys.argv[1])

    pdf_content = generate_pdf(data)
    sys.stdout.buffer.write(pdf_content)

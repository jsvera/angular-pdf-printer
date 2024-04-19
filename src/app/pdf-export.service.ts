import { Injectable } from '@angular/core';
import { PdfService } from './pdf.service';
import { NumerosUtils } from './numeros.utils';
import { Detalle, Factura } from './factura.interface';

@Injectable({
  providedIn: 'root',
})
export class ExportFacturasPdfService {
  constructor(
    private pdfService: PdfService,
    private numerosUtils: NumerosUtils
  ) {}

  generaFacturaPdf(factura: Factura) {
    let heightHoja = 135; // CONFIGURA ALTO DE HOJA EN milimetros
    let widthHoja = 210; // CONFIGURA ANCHO DE HOJA EN milimetros
    let margenContado = 298;
    let margenTotalLetras = 300;
    let margenResumen = 285;
    let margenSuperior = -17;
    let margenIzquierdoEncabezado1 = 180;
    let margenIzquierdoEncabezado2 = 60;
    let margenIzquierdoEncabezado3 = 53;
    let margenIzquierdoTotales = 515;
    let margenDetalles = 25;
    const contenido: any = [];

    let suman = 0;
    factura!.detalles = factura!.detalles.sort((a: any, b: any) =>
      a.CodigoArticulo > b.CodigoArticulo
        ? 1
        : b.CodigoArticulo > a.CodigoArticulo
        ? -1
        : 0
    );
    factura!.detalles.forEach((d: any) => {
      suman += d.PrecioTotal;
    });
    const a = this.formatoDetalles(factura!.detalles);
    const body = [];

    for (const n of a) {
      body.push(n);
    }
    const widthColumnsTablaDetalles = this.widthColumnas();
    const widthLinea = 60;
    let nombres = `${factura!.cliente.Nombre} ${factura!.cliente.Apellido}`;
    let razonSocial = factura!.cliente.RazonSocial.replace('Ñ', 'N');
    let direccionCliente = factura!.cliente.Direccion.replace('Ñ', 'N');
    let sectorCliente = `${factura!.cliente.sector}`;
    sectorCliente = sectorCliente.toUpperCase().replace('Ñ', 'N');
    nombres = nombres.replace('Ñ', 'N');
    nombres =
      nombres.length > widthLinea
        ? `${nombres.substring(0, widthLinea)}`
        : nombres;
    razonSocial =
      razonSocial.length > widthLinea
        ? `${razonSocial.substring(0, widthLinea)}`
        : razonSocial;
    direccionCliente =
      direccionCliente.length > widthLinea
        ? `${direccionCliente.substring(0, widthLinea)}`
        : direccionCliente;
    sectorCliente =
      sectorCliente.length > widthLinea
        ? `${sectorCliente.substring(0, widthLinea)}`
        : sectorCliente;
    let comentario = '';
    if (factura!.Comentario) {
      comentario = factura!.Comentario.trim();
      comentario =
        comentario.length > 180 ? comentario.substring(0, 180) : comentario;
    }
    let cont = [
      {
        margin: [margenIzquierdoEncabezado1, margenSuperior, 0, 0],
        columns: [
          {
            layout: 'noBorders',
            width: 135,
            lineHeight: 0.7,
            fontSize: 7,
            table: {
              body: [
                [{ text: `${factura!.cliente.Codigo}`, fontSize: 9 }],
                [nombres],
                [razonSocial.trim().length > 0 ? razonSocial : '--'],
                [{ text: factura!.cliente.CodigoCliente, fontSize: 9 }],
                [direccionCliente],
                [factura!.cliente.ciudad],
                factura!.cliente.sector ? [sectorCliente] : ['--'],
              ],
            },
          },
          {
            layout: 'noBorders',
            margin: [margenIzquierdoEncabezado2, 0, 0, 0],
            table: {
              body: [
                [factura!.cliente.Telefono1 || 'N/A'],
                [factura!.Fecha],
                ['111111111'],
                [factura.Referencia],
                [factura!.empleado],
                [factura!.CodigoEmpleado],
              ],
            },
          },
          {
            layout: 'noBorders',
            margin: [margenIzquierdoEncabezado3, 25, 0, 0],
            width: 100,
            table: {
              body: [
                [''],
                [''],
                [''],
                [''],
                [''],
                [
                  {
                    text: `${
                      factura!.documento!.NumeroRentas.substring(0, 3) +
                      '-' +
                      factura!.documento!.NumeroRentas.substring(3, 6)
                    } ${factura!.Numero}`,
                    fontSize: 11,
                  },
                ],
              ],
            },
          },
        ],
      },

      {
        layout: 'noBorders',
        margin: [-12, margenDetalles, 0, 0],
        fontSize: 8,
        table: {
          widths: widthColumnsTablaDetalles,
          body: body,
        },
      },
      {
        absolutePosition: { x: 50, y: margenContado - 5 },
        columns: [
          {
            width: 50,
            text:
              factura!.Fecha == factura!.FechaVencimiento
                ? 'CONTADO'
                : 'CREDITO',
          },
        ],
      },
      {
        absolutePosition: { x: 50, y: margenContado + 10 },
        columns: [
          {
            width: 50,
            text:
              factura!.Fecha == factura!.FechaVencimiento
                ? ''
                : factura!.FechaVencimiento,
            fontSize: 9,
          },
        ],
      },
      {
        absolutePosition: { x: 30, y: margenContado + 30 },
        columns: [
          {
            width: 135,
            text: comentario,
            fontSize: 8,
          },
        ],
      },
      {
        absolutePosition: { x: 230, y: margenTotalLetras },
        columns: [
          {
            width: 200,
            text: this.numerosUtils.convertNumberToLetter(
              NumerosUtils.round2(factura!.Total)
            ),
          },
        ],
      },
      {
        layout: 'noBorders',
        table: {
          widths: [22, 39],
          body: [
            ['', NumerosUtils.formatearDecimales(NumerosUtils.round2(suman))],
            [
              {
                text: `${NumerosUtils.calcularDescuento(
                  factura!.Subtotal,
                  factura!.Descuento
                )}%`,
                fontSize: 8,
              },
              `${NumerosUtils.formatearDecimales(factura!.Descuento)}`,
            ],
            ['', `${NumerosUtils.formatearDecimales(factura!.Otros)}`],
            [
              '',
              `${NumerosUtils.formatearDecimales(
                factura!.Subtotal - factura!.Descuento
              )}`,
            ],
            [
              '',
              `${
                NumerosUtils.formatearDecimales(factura!.SubtotalNoGravado) ||
                0.0
              }`,
            ],
            [
              '',
              `${
                NumerosUtils.formatearDecimales(factura!.SubtotalGravado) || 0.0
              }`,
            ],
            [
              `${factura!.PorcentajeIva}%`,
              `${NumerosUtils.formatearDecimales(factura!.Iva)}`,
            ],
            ['', NumerosUtils.formatearDecimales(factura!.Total)],
          ],
        },
        alignment: 'right',
        fontSize: 9,
        lineHeight: 0.7,
        absolutePosition: {
          x: margenIzquierdoTotales,
          y: margenResumen,
        },
      },
    ];

    contenido.push([...cont]);

    let dd = {
      pageSize: {
        width: this.mmToPoints(widthHoja), // CONFIGURA ANCHO DE HOJA EN milimetros
        height: this.mmToPoints(heightHoja), // CONFIGURA ALTO DE HOJA EN milimetros
      },
      pageMargins: [25, 40, 40, 0],
      info: {
        title: `Facturas`,
        author: 'jsvera',
      },
      content: contenido,
      defaultStyle: {
        font: 'Roboto',
        fontSize: 7,
      },
    };

    this.pdfService.generatePdfPrint(dd);
  }

  mmToPoints(mm: number) {
    const MILLIMETERS_IN_INCH = 25.4;
    const POINTS_IN_INCH = 72;
    const inches = mm / MILLIMETERS_IN_INCH;
    return inches * POINTS_IN_INCH;
  }

  formatoDetalles(detalles: Detalle[]) {
    let a: any[] = [];
    let b: any[] = [];
    const truncateText = 42;
    detalles.forEach((d, i) => {
      let descripcionItem = `${d.articulo.NombreArticulo} ${d.articulo.presentacion.Nombre}`;
      descripcionItem = descripcionItem.trimEnd();
      descripcionItem =
        descripcionItem.length > truncateText
          ? `${descripcionItem.substring(0, truncateText)}`
          : descripcionItem;
      descripcionItem = descripcionItem.toUpperCase();
      descripcionItem = descripcionItem.replace('Ñ', 'N');

      b = [
        { text: `${i + 1} ${d.CodigoBodegaOrigen}`, alignment: 'right' },
        d.CodigoArticulo,
        d.articulo.Ean13,
        descripcionItem,
        d.articulo.Pacas,
        d.Cantidad,
        0,
        d.Cantidad,
        d.Iva ? 'SI' : 'NO',
        {
          text: NumerosUtils.formatearDecimales(d.PrecioUnitario, 2),
          alignment: 'center',
        },
        { text: d.Descuento, alignment: 'center' },
        {
          text: NumerosUtils.formatearDecimales(
            NumerosUtils.round2(d.PrecioTotal)
          ),
          alignment: 'center',
        },
      ];
      a.push(b);
    });

    return a;
  }

  widthColumnas() {
    return [
      '5%',
      '8.5%',
      '13%',
      '43.5%',
      '5%',
      '4%',
      '4%',
      '3%',
      '3%',
      '6.5%',
      '4%',
      '6.5%',
    ];
  }
}

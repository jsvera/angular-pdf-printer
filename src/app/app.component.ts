import { Component } from '@angular/core';
import { ExportFacturasPdfService } from './pdf-export.service';
import { Factura } from './factura.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pdf-printer';
  factura: Factura = {
    CodigoCliente: 'CL12345',
    CodigoEmpleado: 'EM67890',
    Comentario: 'Entrega programada para el próximo mes',
    Descuento: 150,
    DescuentoGravado: 100,
    DescuentoNoGravado: 50,
    Numero: 'FAC2024001',
    Fecha: new Date('2024-04-18T00:00:00Z'),
    FechaTransaccion: new Date('2024-04-18T00:00:00Z'),
    FechaVencimiento: new Date('2024-05-18T00:00:00Z'),
    Iva: 160,
    NumeroAutorizacion: 'NA-991282',
    PorcentajeIva: 12,
    Otros: 30,
    Subtotal: 1000,
    SubtotalGravado: 800,
    SubtotalNoGravado: 200,
    SubtotalNoObjetoIva: 0,
    Total: 1240,
    Referencia: 'REF2024001',
    AplicacionNumero: 'AP2024001',
    Referencia2: 'REF2045602',
    documento: {
      Codigo: 'DOC001',
      Nombre: 'Factura A',
      Numero: 'DOCNUM001',
      NumeroRentas: 'REN001',
    },
    cliente: {
      Codigo: 'CL12345',
      CodigoCliente: 'CL12345',
      Nombre: 'Juan',
      Apellido: 'Pérez',
      RazonSocial: 'Pérez S.A.',
      Direccion: 'Av. Siempre Viva 123',
      Telefono1: '555-1234',
      email: 'juan.perez@perezsa.com',
      ciudad: 'Quito',
      parroquia: 'Parroquia X',
      sector: 'Sector Y',
    },
    empleado: 'EM67890',
    detalles: [
      {
        CodigoArticulo: 'ART001',
        Cantidad: 5,
        PrecioUnitario: 200,
        PrecioTotal: 1000,
        Descuento: 50,
        Iva: 120,
        CodigoBodegaOrigen: 'B01',
        articulo: {
          NombreArticulo: 'Artículo A',
          Pacas: 10,
          Ean13: '1234567890123',
          unidad: {
            Abreviatura: 'UN',
          },
          Iva: true,
          presentacion: {
            Codigo: 'PRES01',
            Nombre: 'Caja',
          },
        },
      },
    ],
    facturaReferencia: {
      Id: 1,
      numeroFactura: 'REF2023009',
      documento: {
        Codigo: 'DOC002',
        Nombre: 'Nota de crédito',
        Numero: 'DOCNUM002',
        NumeroRentas: 'REN002',
      },
    },
  };

  constructor(private exportFacturasService: ExportFacturasPdfService) {}

  printer() {
    this.exportFacturasService.generaFacturaPdf(this.factura);
  }
}

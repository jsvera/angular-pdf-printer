export interface Factura {
  CodigoCliente: string;
  CodigoEmpleado: string;
  Comentario: string;
  Descuento: number;
  DescuentoGravado: number;
  DescuentoNoGravado: number;
  Numero: string;
  Fecha: Date;
  FechaTransaccion: Date;
  FechaVencimiento: Date;
  Iva: number;
  NumeroAutorizacion: string;
  PorcentajeIva: number;
  Otros: number;
  Subtotal: number;
  SubtotalGravado: number;
  SubtotalNoGravado: number;
  SubtotalNoObjetoIva: number;
  Total: number;
  Referencia: string;
  AplicacionNumero: string;
  Referencia2: string;
  documento: Documento;
  cliente: Cliente;
  empleado: string;
  detalles: Detalle[];
  facturaReferencia?: FacturaReferencia;
}

export interface Cliente {
  Codigo: string;
  CodigoCliente: string;
  Nombre: string;
  Apellido: string;
  RazonSocial: string;
  Direccion: string;
  Telefono1: string;
  email: string;
  ciudad: string;
  parroquia: string;
  sector: string;
}

export interface FacturaReferencia {
  Id: number;
  numeroFactura: string;
  documento: Documento;
}

export interface Documento {
  Codigo: string;
  Nombre: string;
  Numero: string;
  NumeroRentas: string;
}

export interface Detalle {
  CodigoArticulo: string;
  Cantidad: number;
  PrecioUnitario: number;
  PrecioTotal: number;
  Descuento: number;
  Iva: number;
  CodigoBodegaOrigen: string;
  articulo: Articulo;
}

export interface Articulo {
  NombreArticulo: string;
  Pacas: number;
  Ean13: string;
  unidad: Unidad;
  Iva: boolean;
  presentacion: PresentacionArticulo;
}

interface Unidad {
  Abreviatura: string;
}

export interface PresentacionArticulo {
  Codigo: string;
  Nombre: string;
}

export interface Camion {
  id: Number;
  marca: string;
  modelo: string;
  placa: string;
  label: string;
  estado: string;
}

# Angular Invoice PDF Generator

Este proyecto demuestra cómo generar e imprimir facturas en formato PDF en una aplicación Angular utilizando la biblioteca `pdfmake`.

## Requisitos

Para ejecutar este proyecto necesitas tener instalado:
- Node.js (Recomendado v14.x o superior)
- Angular CLI (Instalar usando `npm install -g @angular/cli`)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona este repositorio usando Git:

2. Navega al directorio del proyecto:

```
cd tu-repositorio
```

3. Instala las dependencias del proyecto:
```
npm install
```

## Ejecución

Para correr la aplicación en el servidor de desarrollo local, ejecuta:

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Generación de PDF

Este proyecto utiliza `pdfmake` para generar documentos PDF. La configuración básica se encuentra en el servicio `ExportFacturasPdfService`, donde se define la estructura del PDF.

### Cómo funciona

- `pdfmake` utiliza un sistema de definición de documentos basado en objetos JavaScript.
- El servicio `ExportFacturasPdfService` construye un objeto `documentDefinition` que incluye el contenido y la configuración del formato del PDF.
- Este objeto se pasa a `pdfmake` para generar el PDF, el cual se puede abrir en una nueva pestaña del navegador o descargar directamente.

### Ejemplo de uso

El componente `AppComponent` incluye un botón que al hacer clic llama a `ExportFacturasPdfService.generaFacturaPdf(invoiceData)`, donde `invoiceData` contiene los datos de la factura que quieres imprimir.



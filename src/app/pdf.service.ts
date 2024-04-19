import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  pdfMake: any;

  constructor() {}

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule;
      this.pdfMake.vfs = pdfFontsModule.pdfMake.vfs;
    }
  }

  async generatePdf(data: any) {
    await this.loadPdfMaker();
    this.pdfMake.createPdf(data, null, null, this.pdfMake.vfs).open();
  }

  async generatePdfPrint(data: any) {
    await this.loadPdfMaker();
    this.pdfMake
      .createPdf(
        data,
        null,
        null, //comentar para font personalizada
        // {
        //   Times: {
        //     normal: 'timesnewroman.ttf',
        //     bold: 'timesnewromanbold.ttf',
        //     italics: 'timesnewromanitalic.ttf',
        //     bolditalics: 'timesnewromanbolditalic.ttf',
        //   },
        // },
        this.pdfMake.vfs
      )
      .print({});
  }
}

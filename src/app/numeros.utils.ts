import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumerosUtils {
  UNIDADES = [
    '',
    'UN ',
    'DOS ',
    'TRES ',
    'CUATRO ',
    'CINCO ',
    'SEIS ',
    'SIETE ',
    'OCHO ',
    'NUEVE ',
    'DIEZ ',
    'ONCE ',
    'DOCE ',
    'TRECE ',
    'CATORCE ',
    'QUINCE ',
    'DIECISEIS ',
    'DIECISIETE ',
    'DIECIOCHO ',
    'DIECINUEVE ',
    'VEINTE ',
  ];
  DECENAS = [
    'VENTI ',
    'TREINTA ',
    'CUARENTA ',
    'CINCUENTA ',
    'SESENTA ',
    'SETENTA ',
    'OCHENTA ',
    'NOVENTA ',
    'CIEN ',
  ];
  CENTENAS = [
    'CIENTO ',
    'DOSCIENTOS ',
    'TRESCIENTOS ',
    'CUATROCIENTOS ',
    'QUINIENTOS ',
    'SEISCIENTOS ',
    'SETECIENTOS ',
    'OCHOCIENTOS ',
    'NOVECIENTOS ',
  ];

  static round2(num: any) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  static formatearDecimales(num: any, decimales: number = 2) {
    return num.toFixed(decimales);
  }

  static calcularDescuento(total: number, descuento: number) {
    let desc = (descuento * 100) / total;
    return desc.toFixed(1);
  }

  getDigitAt(origin: any, position: number) {
    if (origin.length > position && position >= 0) {
      return origin.charAt(origin.length - position - 1);
    }
    return 0;
  }

  convertNumber(number: string) {
    if (number.length > 3) {
      throw new Error('La longitud maxima debe ser 3 digitos');
    }
    // Caso especial con el 100
    if (number == '100') {
      return 'CIEN';
    }
    let output = '';
    if (this.getDigitAt(number, 2) != 0) {
      output += this.CENTENAS[this.getDigitAt(number, 2) - 1];
    }
    let k = parseInt(this.getDigitAt(number, 1) + this.getDigitAt(number, 0));
    if (k <= 20) {
      output += this.UNIDADES[k];
    } else if (k > 30 && this.getDigitAt(number, 0) != 0) {
      output += `${this.DECENAS[this.getDigitAt(number, 1) - 2]}Y ${
        this.UNIDADES[this.getDigitAt(number, 0)]
      }`;
    } else {
      output += `${this.DECENAS[this.getDigitAt(number, 1) - 2]}${
        this.UNIDADES[this.getDigitAt(number, 0)]
      }`;
    }
    return output;
  }

  convertNumberToLetter = (number: Number) => {
    let cadena = '';
    // Validamos que sea un número legal
    if (number > 999999999) {
      throw new Error(
        "El numero es mayor de 999'999.999, " + 'no es posible convertirlo'
      );
    }
    if (number < 0) {
      throw new Error('El numero debe ser positivo');
    }
    let splitNumber = number.toString().replace('.', '#').split('#');
    // Descompone el trio de millones
    let millon = parseInt(
      this.getDigitAt(splitNumber[0], 8).toString() +
        this.getDigitAt(splitNumber[0], 7).toString() +
        this.getDigitAt(splitNumber[0], 6).toString()
    );
    if (millon == 1) {
      cadena += 'UN MILLON ';
    } else if (millon > 1) {
      cadena += this.convertNumber(millon.toString()) + 'MILLONES ';
    }
    // Descompone el trio de miles
    let miles = parseInt(
      this.getDigitAt(splitNumber[0], 5) +
        this.getDigitAt(splitNumber[0], 4) +
        this.getDigitAt(splitNumber[0], 3)
    );
    if (miles == 1) {
      cadena += 'MIL ';
    } else if (miles > 1) {
      cadena += this.convertNumber(miles.toString()) + 'MIL ';
    }
    // Descompone el ultimo trio de unidades
    let cientos = parseInt(
      this.getDigitAt(splitNumber[0], 2) +
        this.getDigitAt(splitNumber[0], 1) +
        this.getDigitAt(splitNumber[0], 0)
    );
    if (cientos == 1) {
      cadena += 'UN ';
    }
    if (millon + miles + cientos == 0) {
      cadena += 'CERO ';
    }
    if (cientos > 1) {
      cadena += this.convertNumber(cientos.toString());
    }
    cadena += 'DOLARES ';
    // Descompone los centavos
    const ctvs = !splitNumber[1]
      ? ''
      : splitNumber[1].length == 0
      ? '00'
      : splitNumber[1].length == 1
      ? splitNumber[1] + '0'
      : splitNumber[1];
    let centavos = parseInt(
      this.getDigitAt(ctvs || 0, 2) +
        this.getDigitAt(ctvs || 0, 1) +
        this.getDigitAt(ctvs || 0, 0)
    );
    if (centavos == 1) {
      cadena += ' CON UN CENTAVO';
    } else if (centavos > 1) {
      cadena += `CON ${this.convertNumber(centavos.toString())}CENTAVOS`;
    }

    return cadena;
  };

  capitalicePalabra(palabra: string) {
    let nuevaPalabra = palabra.charAt(0).toUpperCase();
    nuevaPalabra += palabra.substring(1, palabra.length);
    return nuevaPalabra;
  }
}

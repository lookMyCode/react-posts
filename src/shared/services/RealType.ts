type Type = 'undefined' | 'bigint' | 'boolean' | 'string' | 'symbol' | 'function' | 'number' | 'NaN' | 'Infinity' | 'object' | 'null' | 'array';


export class RealType {
  static getType(item: any): Type {
    if( ['undefined', 'bigint', 'boolean', 'string', 'symbol', 'function'].includes(typeof item) ) {
      return typeof item;
    } else if(typeof item === 'number') {
      return isNaN(item) ? 'NaN' : !isFinite(item) ? 'Infinity' : typeof item;
    } else if(typeof item === 'object') {
      return item === null ? 'null' : Array.isArray(item) ? 'array' : typeof item;
    } else {
      throw new Error('Type error');
    }
  }

  static isUndefined(item: any): boolean {
    return this.getType(item) === 'undefined';
  }

  static isNull(item: any): boolean {
    return this.getType(item) === 'null';
  }

  static isBoolean(item: any): boolean {
    return this.getType(item) === 'boolean';
  }

  static isNumber(item: any): boolean {
    return this.getType(item) === 'number';
  }

  static isInfinity(item: any): boolean {
    return this.getType(item) === 'Infinity';
  }

  static isNaN(item: any): boolean {
    return this.getType(item) === 'NaN';
  }

  static isBigInt(item: any): boolean {
    return this.getType(item) === 'bigint';
  }

  static isString(item: any): boolean {
    return this.getType(item) === 'string';
  }

  static isFunction(item: any): boolean {
    return this.getType(item) === 'function';
  }

  static isArray(item: any): boolean {
    return this.getType(item) === 'array';
  }

  static isObject(item: any): boolean {
    return this.getType(item) === 'object';
  }

  static isSymbol(item: any): boolean {
    return this.getType(item) === 'symbol';
  }
}

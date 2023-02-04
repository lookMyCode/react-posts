import { RealType } from "./RealType";


export default class Utils {

  static objectToQueryString(obj: any) {
    if (!RealType.isObject(obj)) throw new Error('Parametr "obj" must have the object type');
      
    return Object.entries(obj)
      .map(row => row.map((col: any) => {
        try {
          return col?.trim() || ''
        } catch (_) {
          return col;
        }
      }))
      .map(row => {
        if (RealType.isObject(row[1]) || RealType.isArray(row[1])) {
          row[1] = JSON.stringify(row[1]);
        }

        return row;
      })
      .map(row => `${row[0]}=${row[1]}`)
      .join('&');
  }

  static queryStringToObject(queryStr: string) {
    queryStr = queryStr.charAt(0) === '?' ? queryStr.substring(1) : queryStr;
    const entries = queryStr
      .split('&')
      .map(row => row.split('='))
      .filter(row => !!row[0]);

    return (Object as any).fromEntries(entries);
  }
}
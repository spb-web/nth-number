const getTemplateError = (template:string) => {
  return new Error(`Invalid template "${template}"\nsee https://github.com/spb-web/nth-number#readme`)
}

export class NthNumber {
  public readonly multiple: number
  public readonly offset: number

  constructor(nthTemplate:string) {
    const result = /^(\d*)?n([\+|\-]\d+)?$/.exec(nthTemplate);

    if (!result) {
      throw getTemplateError(nthTemplate)
    }
 
    this.multiple = result[1] ? Number(result[1]) : 1
    this.offset = result[2] ? Number(result[2]) : 0

    if (Math.abs(this.offset) >= this.multiple) {
      throw getTemplateError(nthTemplate)
    }
  }

  public get(value:number) {
    return this.multiple * value + this.offset
  }

  public isNth(val: number) {
    return (val - this.offset) % this.multiple === 0
  }

  public list(start:number, end:number) {
    const indexes:number[] = []

    this.for(start, end, (index) => indexes.push(index))

    return indexes
  }

  public for(start:number, end:number, callback:(index:number) => any) {
    for (
      let index = start, nthNumber = this.get(start);
      index < end && nthNumber < end;
      index++, nthNumber = this.get(index)
    ) {
      callback(nthNumber)    
    }
  }

  public async pFor(start:number, end:number, callback:(index:number) => Promise<any>) {
    for (
      let index = start, nthNumber = this.get(start);
      index < end && nthNumber < end;
      index++, nthNumber = this.get(index)
    ) {
      await callback(nthNumber)    
    }
  }

  static get(template:string, index: number) {
    return (new NthNumber(template)).get(index)
  }

  static isNth(template:string, value: number) {
    return (new NthNumber(template)).isNth(value)
  }

  static list(template:string, start: number, end: number) {
    return (new NthNumber(template)).list(start, end)
  }

  static for(template:string, start: number, end: number, callback: (index:number) => any) {
    return (new NthNumber(template)).for(start, end, callback)
  }

  static pFor(template:string, start: number, end: number, callback: (index:number) => Promise<any>) {
    return (new NthNumber(template)).pFor(start, end, callback)
  }
}

This tiny library allows the nth number of ordinal numbers like in the css syntax of the nth-child pseudo selector.

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/nth-number?color=%233eaf7c&style=for-the-badge&logo=appveyor)](https://bundlephobia.com/result?p=nth-number)

## Examples

#### Get nth number of index

```ts
NthNumber.get('2n', 0)   // 0
NthNumber.get('2n', 1)   // 2
NthNumber.get('2n+1', 1) // 3
NthNumber.get('2n+1', 1) // 1
```

#### Check nth

```ts
NthNumber.isNth('2n', 10) // true
NthNumber.isNth('2n', 11) // false
```

#### Get list of nth number

```ts
NthNumber.list('3n', 0, 10)   // [0, 3, 6, 9] 
NthNumber.list('3n+1', 0, 10) // [1, 4, 7]
```

#### Loop
```ts
NthNumber.for('3n', 0, 10, (num) => console.log(num))
// 0
// 3
// 6
// 9 

await NthNumber.pFor('3n+1', 0, 10, async (num) => console.log(num))
// 1
// 4
// 7
```

#### Use instance
```ts
const nthNumber = new NthNumber('3n+2')

nthNumber.get(100)  // 302
nthNumber.isNth(31) // false
nthNumber.isNth(32) // true
nthNumber.for(0, 10, (num) => console.log(num))
// 2
// 5
// 8 
await nthNumber.pFor(0, 10, async (num) => console.log(num))
// 2
// 5
// 8 
```

### Template
pattern: `^\d*n([\+|\-]\d+)?$`

In the template, the multiplier must be larger than the offset.

`6n+3` - correct

`6n+30` - incorrect

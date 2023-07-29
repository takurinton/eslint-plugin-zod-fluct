# eslint-plugin-zod-fluct

fluct で zod を使うための eslint プラグインです。  
まだ開発途中です。

## インストール

```sh
pnpm install -D @takurinton/eslint-plugin-zod-fluct
```

## 使い方

```js
// .eslintrc.js
module.exports = {
  plugins: ["zod-fluct"],
  rules: {
    // 適用したいルールを追加する
    "@takurinton/zod-fluct/number": "error",
    "@takurinton/zod-fluct/string": "error",
    "@takurinton/zod-fluct/utils": "error",
  },
};
```

## ルール

対応するつもりがあるものを書いてます。  
もしかしたらもう少し抽象化したりするかもしれません。

- [x] number
- [x] string
- [ ] array
- [ ] object
- [ ] discriminated unions / unions
- [ ] enum
- [ ] refine
- [x] utils

### number

- min() を必ずつける
- max() を必ずつける
- min() と max() 以外の範囲を制限する検証（nonnegative, positive, ...etc）は禁止
  - https://github.com/colinhacks/zod#numbers
- エラーメッセージは必須
- 表記ぶれを防ぐために以下のエイリアスを禁止する。
  - gt
  - gte
  - lt
  - lte
  - nonnegative
  - positive
  - negative
  - nonpositive
  - finite

### string

- nullable() または optional() または nullish() が指定されてない場合は min() は必ずつける
  - 存在確認は min() を使う
- max() を必ずつける
- エラーメッセージは必須

### array

TODO

### object

TODO

### discriminated unions / unions

TODO

### enum

TODO

### refine

TODO

### utils

- nullable と optional は同時に使わない
  - 代わりに nullish を使う
- passthrough は使わない
- strip は使わない
- エラーメッセージはオブジェクトで渡す
  - ref https://github.com/colinhacks/zod/issues/97#issuecomment-664178323
- 表記ぶれを防ぐために以下のエイリアスを禁止する。
  - spa

## 例

number を使用するときは min() と max() にエラーメッセージをオブジェクトで渡す。

```ts
import { z } from "zod";

// min と max にエラーメッセージがないのでエラー
const schema = z.number().min(0).max(100);

// min と max にエラーメッセージがあるのでエラーにならない
const schema = z
  .number()
  .min(0, { message: "0以上である必要があります" })
  .max(100, { message: "100以下である必要があります" });
```

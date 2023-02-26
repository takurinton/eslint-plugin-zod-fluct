# eslint-plugin-zod-fluct

fluct で zod を使うための eslint プラグインです。  
まだ開発途中です。

## インストール

```sh
yarn add -D @takurinton/eslint-plugin-zod-fluct
```

## 使い方

```js
// .eslintrc.js
module.exports = {
  extends: ["plugin:zod-fluct/recommended"],
  rules: {
    // 適用したいルールを追加する
    "@takurinton/zod-fluct/number": "error",
    "@takurinton/zod-fluct/string": "error",
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

### number

- min() を必ずつける
- max() を必ずつける
- min() と max() 以外の範囲を制限する検証（nonnegative, positive, ...etc）は禁止
  - https://github.com/colinhacks/zod#numbers
- エラーメッセージは必須
- エラーメッセージは文字列で
  - オブジェクトで渡す方法もあるけど表記ブレの意思決定とレビューコストはかけたくないので文字列のみに絞る

### string

- optional() が指定されてない場合は min() は必ずつける
  - 存在確認は min() を使う
  - もしかしたら optional() がある時は required_error の指定を必須にするとかをしたほうがいいかもしれない
- max() を必ずつける
- エラーメッセージは必須
- エラーメッセージはオブジェクト
  - 文字列で渡す方法もあるけど表記ブレの意思決定とレビューコストはかけたくないのでオブジェクトのみに絞る
  - ref https://github.com/colinhacks/zod/issues/97#issuecomment-664178323

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

## 例

number を使用するときは min() と max() にエラーメッセージを string で渡す.

```ts
import { z } from "zod";

// min と max にエラーメッセージがないのでエラー
const schema = z.number().min(0).max(100);

// min と max にエラーメッセージがあるのでエラーにならない
const schema = z
  .number()
  .min(0, "0以上である必要があります")
  .max(100, "100以下である必要があります");
```

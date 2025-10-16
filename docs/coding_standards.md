# コーディング規約

## TypeScript

### 型定義

- **`interface` ではなく `type` を使用する**
  ```typescript
  // ❌ 使用しない
  interface User {
    id: string;
    name: string;
  }

  // ✅ 使用する
  type User = {
    id: string;
    name: string;
  };
  ```

- **型エイリアスは PascalCase**
  ```typescript
  type UserCredentials = {
    username: string;
    password: string;
  };
  ```

### 非同期処理

- **データ取得には `useQuery` を使用**
  ```typescript
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  ```

- **データ更新には `useMutation` を使用**
  ```typescript
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  ```

- **fetch ではなく axios を使用**
  ```typescript
  // ❌ 使用しない
  const response = await fetch("/api/user");

  // ✅ 使用する
  const { data } = await axios.get("/api/user");
  ```

## React

### コンポーネント定義

- **関数宣言で定義**
  ```typescript
  export default function MyComponent() {
    return <div>Hello</div>;
  }
  ```

### ファイル構成

- **API関数は `lib/` ディレクトリに配置**
  - `lib/api.ts` - API関数の集約
  - axios client の設定もここに含める

- **型定義はファイル内で定義、共通型は `lib/api.ts` に export**

## コードスタイル

### フォーマット

- **Prettier を使用**
  - セミコロン: あり
  - シングルクォート: なし（ダブルクォート使用）
  - タブ幅: 2スペース

### コミット前

```bash
# フォーマット確認
npm run format:check

# 自動フォーマット
npm run format

# Lint実行
npm run lint
```

## ディレクトリ構成

```
app/
  ├── api/           # API Routes
  ├── (pages)/       # ページコンポーネント
  ├── providers.tsx  # React Query Provider
  └── layout.tsx     # ルートレイアウト

lib/
  └── api.ts         # API関数とaxios設定

docs/
  └── *.md           # ドキュメント
```

## 命名規則

- **ファイル名**: kebab-case（例: `user-profile.tsx`）
- **コンポーネント名**: PascalCase（例: `UserProfile`）
- **関数名**: camelCase（例: `fetchUserData`）
- **定数**: UPPER_SNAKE_CASE（例: `API_BASE_URL`）
- **型名**: PascalCase（例: `UserData`）

## その他のベストプラクティス

- **クライアントコンポーネントは明示的に `"use client"` を記述**
- **未使用のimportは削除する**
- **コンソールログは本番環境では削除する**

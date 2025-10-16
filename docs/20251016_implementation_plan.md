# 20251016_implementation_plan.md

## プロジェクト概要

Next.js 15 App Router + セッション認証による擬似的な認証サンプルアプリケーション

## 認証仕様

### 擬似認証の仕様
- ユーザー: `id: "test"`, `password: "test"` の固定1ユーザー
- セッション: 固定トークン `"fixed-session-token-12345"` をcookieで管理
- 認証成功後、このセッショントークンを使って各APIにアクセス

### API エンドポイント

```
app/api/
  ├── login/route.ts    # POST: ログイン処理（id/pass検証、セッション作成）
  ├── logout/route.ts   # POST: ログアウト処理（セッション削除）
  └── user/route.ts     # GET: ユーザー情報取得（セッション検証）
```

## 実装計画

### Phase 1: API Routes の実装
- [x] `/api/login` - id/passチェック、セッションcookie設定
- [ ] `/api/logout` - セッションcookie削除
- [ ] `/api/user` - セッション検証、ユーザー情報返却

### Phase 2: UI の実装
- [ ] ログインページ (`app/login/page.tsx`)
- [ ] ログインフォームコンポーネント
- [ ] ログアウトボタン
- [ ] ユーザー情報表示

### Phase 3: 認証保護
- [ ] ミドルウェア実装 (`middleware.ts`)
- [ ] 保護されたページの作成
- [ ] リダイレクト処理

### Phase 4: CRUD機能（今後実装予定）
- [ ] データ管理用のAPI設計
- [ ] CRUD UI実装

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Cookie-based Session (Next.js cookies API)

## 認証フロー

```
1. ユーザーが /login ページでid/passを入力
2. POST /api/login でバックエンド検証
3. 成功時、固定セッショントークンをhttpOnly cookieにセット
4. / にリダイレクト
5. 各ページで GET /api/user を呼び、セッション検証
6. ログアウト時、POST /api/logout でcookie削除
```

## 実装ファイル

### 新規作成
- `app/api/login/route.ts`
- `app/api/logout/route.ts`
- `app/api/user/route.ts`
- `app/login/page.tsx`
- `middleware.ts`
- `lib/session.ts` (セッション検証ヘルパー)

### 変更
- `app/page.tsx` - ログイン状態表示、ログアウトボタン追加
- `app/layout.tsx` - 認証状態に応じたUI調整（必要に応じて）

## セキュリティ考慮事項（本番環境用メモ）

本実装は擬似的な認証のため、以下は実装しませんが、本番環境では必要：
- パスワードのハッシュ化
- CSRF対策
- セッショントークンの暗号化・有効期限
- HTTPSの強制

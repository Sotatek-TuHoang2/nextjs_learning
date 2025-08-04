---
applyTo: "**/*.ts?(x)"
---

# Hướng dẫn chi tiết cho Code Frontend (React + UI)

- **Luôn dùng UI Ant Design**, không dùng Tailwind hoặc bất cứ utility-class nào khác.
- Các component UI cần:
  - Hợp lý hóa `props` qua `interface` (không dùng `type`)
  - styled bằng `antd` layout / `useTailwind?` NEVER
- Sử dụng `function ComponentName(props: PropsInterface): React.ReactNode` (named export)
- Riêng client components:
  - thêm `"use client"` dòng đầu file
  - wrap trong `<Suspense fallback={<Spin />}>`
- Global state hoặc data-loading:
  - Dùng `nuqs` để sync query params
  - Dùng React server components để fetch nếu có thể
- Sử dụng hook nhỏ (pure) để fetch & memo logic; các UI component chỉ nhận props & render
- Không viết logic business trong JSX, tách ra helpers hoặc service

## Ví dụ code:

```ts
// components/UserList.tsx
"use client";

import { List, Spin } from "antd";
import type { User } from "../types";
import { useGetUsers } from "../services/user";

interface UserListProps { /* ... */ }

export function UserList({ page }: UserListProps) {
  const { data, isLoading } = useGetUsers(page);
  if (isLoading) return <Spin />;
  return (
    <List
      dataSource={data}
      renderItem={(item: User) => <List.Item>{item.name}</List.Item>}
    />
  );
}

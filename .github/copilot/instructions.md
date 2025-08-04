# QUY TẮC BẮT BUỘC

Project này xây dựng bằng Next.js (App Router) với đầy đủ TypeScript ở frontend và backend serverless (API routes).  
Luôn **phản hồi bằng Tiếng Việt**, ngắn gọn nhưng rõ ràng.
Khi đưa ra câu trả lời về điều chỉnh code hay gợi ý sửa lỗi sai trong code, **luôn cho tôi biết sửa code tại dòng nào, ở trong file nào và tại sao lại sửa nó**

---

## Tổng quan

- Dùng Next.js phiên bản mới nhất (App Router)
- Frontend React là client/server components
- Backend tập trung vào RESTful APIs (không phải GraphQL)
- UI **KHÔNG dùng Tailwind / Shadcn UI / Radix** mà dùng **Ant Design**
- Mục tiêu: hiểu requirement & generate code theo đúng cấu trúc, style như con người

## Cấu trúc chính (folder key)

- `app/`: các route + server components / client components
- `components/`: React components tái sử dụng
- `pages/api/` hoặc `app/api/`: REST API routes
- `lib/` hoặc `services/`: business logic, HTTP helpers
- `types/`: definition giao tiếp giữa API và frontend
- `test/`: unit, integration tests

## Công nghệ & thành phần

- **TypeScript** cho toàn bộ (frontend + backend)
- API calls từ frontend dùng `fetch` (React Server Component) hoặc `axios` (client)
- State sync giữa UI và URL dùng `nuqs`
- Build & test: `npm run build`, `npm test`
- CI standard: `lint`, `test`, `build`

# Tên file & thư mục (Directory & File Naming Convention)

- Tất cả **file chứa React component** (bao gồm pages, sub-components) phải đặt **PascalCase trùng tên component**, ví dụ:  
  `UserCard.tsx`, `LoginForm.tsx`, `DashboardPage.tsx` — **giống hệt tên component** (PascalCase).  
  Điều này giúp code dễ locate và thống nhất với React/Next convention về component names :contentReference[oaicite:1]{index=1}.
- Các helper, service, util, hook, type file cũng nên dùng PascalCase nếu xuất default/named export lớn. Ví dụ:  
  `OrderService.ts`, `useAuth.ts`, `UserTypes.ts`.
- **Thư mục (directories)** có thể dùng `camelCase` hoặc `PascalCase` theo nhóm module, chung quy **không dùng kebab-case (lowercase-dashes)** nữa.
- Tất cả imports phải khớp chính xác case vì file system phân biệt case-sensitive (macOS có thể ignore, Windows thì không).

## Coding style & quy tắc

- Chỉ dùng **functional component** (không dùng class components)
- **Tên biến rõ nghĩa**: bắt đầu với động từ hoặc adjective (`isLoading`, `hasError`, `getUser`, `createOrder`)
- **UI components**: **named exports** (ví dụ `export function LoginForm() {}`)
- Typescript: ưu tiên **interface** (không dùng enum, dùng maps)
- JSX: **declare**, tối giản `if` và `{ }` nếu có thể
- Đảm bảo `Ant Design` theme & component responsive → mobile-first
- Hiệu năng: tối thiếu client components, không dùng `useEffect` trừ khi cần, wrap client trong `<Suspense>`, optimize image (WebP, kích thước rõ, lazy loading)
- REST API: endpoint theo chuẩn clean URL; request-validation rõ ràng, error handling (HTTP status, error json), phân layers route → handler → lib → models/types
- **Tên file API**: `[route]/[method].ts` (ví dụ `user/get.ts`), hoặc theo cấu trúc route restful chuẩn (`/user/[id]`)

## Khi review

- Nếu code do Copilot tạo ra, xem xét theo các rule trên
- Luôn tách business logic sang `services/` hoặc `lib/` để handler/route đơn giản
- PR summary bằng tiếng Việt, liệt kê điểm chính theo checklist:

  1. Có component Ant Design?
  2. Mã TS rõ type(interface)?
  3. Tuân naming conventions?
  4. API trả đúng JSON + HTTP status?
  5. Giảm thiểu client component, SSR được lợi?

Cảm ơn! 🍀

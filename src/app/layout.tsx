import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

export const metadata = {
  title: "Student Management",
  description: "A modern student management web application that allows administrators to add, edit, delete, and view student profiles with ease. Built with Next.js, TypeScript, and Ant Design."
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <ConfigProvider>
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
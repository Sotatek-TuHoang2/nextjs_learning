import React from 'react';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

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
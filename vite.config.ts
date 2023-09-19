import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// import vitePluginCDN from 'vite-plugin-cdn-import';

export default defineConfig({
  plugins: [
    // vitePluginCDN({
    //   // 配置需要 CDN 加速的模块
    //   modules: [
    //     {
    //       name: 'react',
    //       var: 'React',
    //       path: 'https://cdn.bootcdn.net/ajax/libs/react/18.0.0/cjs/react-jsx-dev-runtime.development.js',
    //     },
    //     {
    //       name: 'antd',
    //       var: 'antd',
    //       path: 'https://cdnjs.cloudflare.com/ajax/libs/antd/5.9.1/antd.min.js',
    //     },
    //     {
    //       name: 'react-router-dom',
    //       var: 'react-router-dom',
    //       path: 'https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.15.0/react-router-dom.development.js',
    //     },
    //     {
    //       name: 'axios',
    //       var: 'axios',
    //       path: 'https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js',
    //     },
    //     {
    //       name: 'classnames',
    //       var: 'classnames',
    //       path: 'https://cdn.bootcdn.net/ajax/libs/classnames/2.3.2/dedupe.js',
    //     },
    //   ],
    // }),
    react(),
    svgr(),
    // viteCompression({
    //   threshold: 100, // 对大于 1mb 的文件进行压缩
    // }),
  ],
  build: {
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-router-dom'],
          // 'react-vendor': ['react'],
          lodash: ['lodash'],
          library: ['antd'],
          // axios: ['axios'],
        },
      },
    },
  },
});

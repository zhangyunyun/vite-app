import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置@别名
import { resolve } from 'path'
//自动导入vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite'
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
//setup语法糖下如何定义组件名称
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
//element
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//ant-design-vue
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

export default defineConfig({
  resolve:{
    //在导入模块时，如果模块路径不包含文件扩展名，则会尝试添加下面这些扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    vue(),  //react()
    VueSetupExtend(), //setup 语法糖下如何定义组件名称
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      
      //存放的位置
      dts: "src/auto-import.d.ts",

      //ant-design-vue
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver()
      ]
    }),
    Components({
      //引入组件的,包括自定义组件
      //存放的位置
      dts: "src/components.d.ts",

      //ant-design-vue  importStyle = false 样式就没了
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver({importStyle: true, resolveIcons: true})
      ]
    }),
    viteCommonjs()
  ],
  optimizeDeps:{
    esbuildOptions: {
      plugins: [
        esbuildCommonjs(['ant-design-vue'])
      ],
    }
  },
  server:{
    proxy:{
      '/api': { // 匹配请求路径，
        target: 'https://gsydweixin.com/work-business/api', //代理的目标地址(后台接口地址)
         // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})

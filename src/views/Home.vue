<template>
  <div class="home">
    <h2 class="title">1.Pinia</h2>
    <div class="content">
      <div>名称:{{name}}</div>
      <div>计数(counter):{{counter}}</div>
      <div>双倍计数(doubleCount):{{doubleCount}}</div>
      <button @click="change">change</button>
      <button @click="main.increment()">counter++</button>
    </div>
    <h2 class="title">2.axios</h2>
    <div class="proBox">
      <!-- <ul class="proTab">
        <li>tab1</li>
        <li>tab2</li>
        <li>tab3</li>
      </ul>
      <ul class="proList">
        <li>
          <div class="listItem">
            <div class="listItem_lt">
              <img src="" alt="" />
            </div>
            <div class="listItem_ct">
              <h3>名称</h3>
              <p>描述</p>
            </div>
            <div class="listItem_rt">
              <button>转发</button>
            </div>
          </div>
        </li>
      </ul> -->
      <a-tabs
        @prevClick="callback"
        @nextClick="callback"
        default-active-key="0"
      >
      <a-tab-pane v-for="(item,index) in tabContsList" :key="index" :tab="`${tabTitleList[index]}`">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <div class="listItemList"
               v-infinite-scroll="load"
               infinite-scroll-disabled="disabled">
            <div class="listItem" v-for="(its,index) in item" :key="index">
              <div class="listItem_lt">
                <img :src="its.bussImg" alt="" />
              </div>
              <div class="listItem_ct">
                <h3>{{its.bussName}}</h3>
                <p>{{its.bussDesc}}</p>
              </div>
              <div class="listItem_rt">
                <button>转发</button>
              </div>
            </div>
          </div>
          <p v-if="loading" class="text"><span>加载中...</span></p>
          <p v-if="noMore" class="text"><span>没有更多了哦~</span></p>
        </div>
      </a-tab-pane>
    </a-tabs>
    </div>
    <h2 class="title">3.echarts</h2>
    <div class="echartBox">
      <div class="myCharts" id="myCharts"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { ref, reactive } from 'vue'
  //引入想要的pinia文件,里面就是对应导出的名字
  import { storeToRefs } from 'pinia'
  import { useMain } from '../store/index'

  //引入请求接口函数
  import { reqCommodity, reqForwardLink} from '../api/index'
 
  //***引入
  //import * as echarts from 'echarts'
  export default defineComponent({
    setup(){
      const count = ref(3)
      const loading = ref(false)
      const noMore = computed(() => count.value >= 10)
      const disabled = computed(() => loading.value || noMore.value)
      const activeKey = ref('1')
      const tabTitleList = reactive([])
      const tabContsList = reactive([])
      function load(){
        loading.value = true
        setTimeout(() => {
          count.value += 2
          loading.value = false
        }, 2000);
      }
      function getList(){
        reqCommodity()
        .then((res) => {
          if(res.code == '0'){
            const commodityList = res.data.map((item,index) => {
              tabTitleList.push(item.categoryName)
              tabContsList.push(item.goods)
            })
            console.log(tabTitleList)
            console.log(tabContsList)
          }
        })
      }
      onMounted(() => {
        getList()
      })
      return{
        count,
        loading,
        noMore,
        disabled,
        load,
        activeKey,
        tabTitleList,
        tabContsList
      }
    }
  })
  

  //--pinia 获取状态存储的数据
  // const main = useMain()
  // let { name, counter, doubleCount } = storeToRefs(main)
  // counter = '999'
  // const change = () => {
  //   main.$patch((state) => {
  //     state.counter += 10
  //     state.name = '修改为张三'
  //   })
  // }

</script>

<style scoped lang="scss">
button{
  background:#00a97a;
}
.home{
  padding:10px;
  .title{
    margin-top:15px;
    font-size:20px;
    font-weight:bold;
    &:first-child{
      margin-top:0;
    }
  }
  .content{
    button{
      margin:0 5px;
      color:#fff;
    }
  }
}
/* .proBox{
  margin-top:5px;
  .proTab{
    display: flex;
    align-items: center;
    justify-content: center;
    height:40px;
    line-height:40px;
    li{
      flex:1;
    }
  }
  .proList{
    display:flex;
    align-items: center;
    justify-content:center;
    li{
      flex:1;
      display:flex;
      align-items: center;
      justify-content:center;
    }
  }
} */
.proBox{
  .infinite-list-wrapper {
    height:300px;
  }
  p.text{
    margin-top:20px;
    text-align:center;
    color:#333;
    span{
      border-radius:5px;
      background:#ebebeb;
      padding:5px 10px;
    }
  }
  .listItem{
    margin:5px 0;
    display:table;
    table-layout:fixed;
    width:100%;
    &_lt,&_ct,&_rt{
      display:table-cell;
      position:relative;
      vertical-align:middle;
    } 
    &_lt{
      width:50px;
      img{
        display:block;
        width:50px;
      }
    }
    &_ct{
      h3{
        color:#333;
        font-size:15px;
      }
      p{
        color:#999;
        font-size:12px;
      }
    }
    &_rt{
      width:50px;
      button{
        font-size:14px;
        color:#fff;
        height:28px;
        line-height:26px;
      }
    }
  }
}

.echartBox{
  margin-top:5px;
  .myCharts{
    width:150px;
    height:150px;
  }
}
</style>

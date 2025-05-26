<template>
  <Card title="医保卡实时结算" class="md:h-80">
    <!-- <div class="module_title">医保卡实时结算</div> -->
    <div class="card w-full h-50">
      <div class="card-numbers">
        <div class="card-number-left">
          <div class="md:text-1xl ml-2">本年度医疗消费</div>
          <div class="flex mr-6 mt-2 jine">
            <div class="d-inline insurance-number-size">{{ sheBaoXiaoFei }}</div>
            <!-- <div class="d-inline insurance-number-size">8,367.51</div> -->
            <div class="d-inline yuanzi">元</div>
          </div>
        </div>
        <div class="card-number-right">
          <div class="md:text-1xl">本年度医保实时结算</div>
          <div class="flex mt-2 jine">
            <div class="d-inline insurance-number-size2">{{ sheBaoJieSuan }}</div>
            <!-- <div class="d-inline insurance-number-size2">6,560.08</div> -->
            <div class="d-inline yuanzi">元</div>
          </div>
        </div>
      </div>
      <div class="card-number">
        {{ p.propleInfo.sheBaoKaHao }}
        <!-- <span>1234</span>
        <span>5678</span>
        <span>9012</span>
        <span>3456</span> -->
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineProps, computed } from 'vue';
  import { Card } from 'ant-design-vue';
  import { BasicInformation } from '/@/api/information/basicInformation';
  interface PropTypes {
    propleInfo: BasicInformation;
  }
  const p = defineProps<PropTypes>();
  // 使用计算属性来格式化金额
  const sheBaoXiaoFei = computed(() => {
    // 使用Intl.NumberFormat来格式化数字为带有逗号的金额
    return new Intl.NumberFormat('zh-CN', {
      style: 'decimal',
      minimumFractionDigits: 2, // 小数点后至少两位
      maximumFractionDigits: 2, // 小数点后最多两位
    }).format(p.propleInfo.sheBaoXiaoFei);
  });
  const sheBaoJieSuan = computed(() => {
    // 使用Intl.NumberFormat来格式化数字为带有逗号的金额
    return new Intl.NumberFormat('zh-CN', {
      style: 'decimal',
      minimumFractionDigits: 2, // 小数点后至少两位
      maximumFractionDigits: 2, // 小数点后最多两位
    }).format(p.propleInfo.sheBaoJieSuan);
  });
</script>
<style lang="less" scoped>
  .module_title {
    color: #000000;
    font-size: large;
  }
  .card {
    border-radius: 10px;
    border: #9ed3e7 solid 2px;
    padding: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #dbf1ff;
    .yuanzi {
      line-height: 60px;
      font-size: 16px;
      margin-left: 8px;
    }
  }

  .card-number {
    margin-top: 24px;
    letter-spacing: 4px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中（如果需要的话）*/
    font-size: 24px; /* 根据需要调整字体大小 */
    color: #9e9e9e; /* 银色文字 */
    line-height: 1; /* 调整行高以去除多余间距 */
    span {
      margin: 0 4px; /* 数字之间的间距 */
      display: inline-block; /* 使其可以独立设置margin */
    }
  }

  .card-numbers {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    font-size: 20px;
  }

  .card-number-left {
    .jine {
      color: #2a50ec;
    }
    .insurance-number-size {
      font-size: 32px;
      font-weight: bold;
    }
  }
  .card-number-right {
    margin-left: 100px;
    text-align: center;
    .jine {
      color: #52c41a;
    }
    .insurance-number-size2 {
      font-size: 32px;
      font-weight: bold;
    }
  }
</style>

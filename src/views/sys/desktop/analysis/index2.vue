<template>
  <div>
    <div class="md:flex">
      <div class="enter-y md:w-1/2">
        <!-- 搜索框 -->
        <Search class="md:mb-2" />
        <!-- chart 图表 -->
        <SiteAnalysis class="enter-y mt-2" />
        <div class="mt-2">
          <!-- 科室占比、实时体温、心率 -->
          <NowInfo class="w-full" :phone="phone" />
          <!-- 健康标签 -->
          <Report class="w-full mt-2" :propleInfo="userInfo" />
          <!-- 我的预约 -->
          <MyReserve class="w-full mt-2" :phone="phone" />
        </div>
      </div>
      <div class="enter-y md:w-1/2">
        <!-- 基础信息 -->
        <BasicInfo class="w-full !md:mx-4 !md:my-0 h-2/8" :propleInfo="userInfo" />
        <!-- 诊断意见 -->
        <HealthEvent class="w-full !my-4 !md:mx-4" :phone="phone" />
        <!-- 医保卡结算 -->
        <MedicalInsurance class="w-full !md:mx-4 h-5/8" :propleInfo="userInfo" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="Analysis">
  import BasicInfo from './components/BasicInfo2.vue';
  import NowInfo from './components/NowInfo.vue';
  import Report from './components/Report2.vue';
  import Search from './components/Search.vue';
  import MyReserve from './components/MyReserve2.vue';
  // import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  // import VisitSource from './components/VisitSource.vue';
  // import VisitRadar from './components/VisitRadar.vue';
  // import SalesProductPie from './components/SalesProductPie.vue';
  // import BasicInfo from './components/BasicInfo.vue';
  import HealthEvent from './components/HealthEvent.vue';
  import MedicalInsurance from './components/MedicalInsurance2.vue';
  import { ref, onMounted, provide } from 'vue';
  import { getBaseInfo } from '/@/api/sys/desktopApi';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  // const phone = route.query.phone;
  // console.log('参数', phone);
  const phone = route.query.phone ? route.query.phone : '13021646422';
  provide('phone', phone);
  // console.log(phone);
  // 使用 ref 创建一个响应式引用
  const userInfo = ref({});
  // const phone = '13021646422';
  onMounted(async () => {
    try {
      // console.log(phone);
      // 调用异步函数并等待结果
      const data = await getBaseInfo({
        phone: phone,
      });
      // console.log(data);
      // 更新响应式引用
      userInfo.value = data;
      // 处理从 getBaseInfo 返回的数据
      // console.log(data);
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });
</script>

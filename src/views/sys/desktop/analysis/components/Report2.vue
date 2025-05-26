<template>
  <div class="md:flex">
    <Card
      size="small"
      :loading="loading"
      title="健康标签"
      class="md:w-4/4 w-full !md:mt-0 !mt-4 cursor-pointer"
      :canExpan="false"
    >
      <div class="py-4 px-4 flex justify-between">
        <div class="flex">
          <Icon icon="xinlv|svg" :size="40" />
          <div class="icon-text">{{
            p.propleInfo.biaoQian ? p.propleInfo.biaoQian.split('|')[0] : ''
          }}</div>
          <!-- <div class="icon-text">心率不齐</div> -->
        </div>
        <div class="flex">
          <Icon icon="xueya|svg" :size="40" />
          <div class="icon-text">{{
            p.propleInfo.biaoQian ? p.propleInfo.biaoQian.split('|')[1] : ''
          }}</div>
          <!-- <div class="icon-text">低压偏离</div> -->
        </div>
        <div class="flex">
          <Icon icon="shuimian|svg" :size="40" />
          <div class="icon-text">{{
            p.propleInfo.biaoQian ? p.propleInfo.biaoQian.split('|')[2] : ''
          }}</div>
          <!-- <div class="icon-text">起夜频繁</div> -->
        </div>
        <div @click="navPage('https://taotao.gold/kangyang/')">
          <div>建议就医检查</div>
          <div>去预约>></div>
        </div>
      </div>
      <template #extra>
        <a href="#" style="color: #1951be">@协作网</a>
      </template>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Card } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { BasicInformation } from '/@/api/information/basicInformation';

  interface GrowCardItem {
    icon: string;
    title: string;
    value: number;
    total: number;
    color: string;
    action: string;
    url: string;
  }
  interface PropTypes {
    propleInfo: BasicInformation;
  }
  const loading = ref(true);
  const growCardList = ref<GrowCardItem[]>();
  const go = useGo();
  const p = defineProps<PropTypes>();

  onMounted(() => {
    const list: GrowCardItem[] = [
      {
        title: '近期健康报告',
        icon: 'visit-count|svg',
        value: 1999,
        total: 120000,
        color: 'green',
        action: '时',
        url: '/desktop/workbench',
      },
    ];
    // 此处写后端 API 获取 list 数据
    growCardList.value = list;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  });

  function navPage(url: string) {
    if (!url || url === '') {
      return;
    }
    if (url.indexOf('://') != -1) {
      window.open(url);
    } else {
      go(url);
    }
  }
</script>
<style lang="less" scoped>
  .icon-text {
    line-height: 40px;
    margin-left: 10px;
  }
</style>

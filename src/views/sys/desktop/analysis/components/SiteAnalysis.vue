<template>
  <Card
    v-bind="$attrs"
    :loading="loading"
    :tab-list="tabListTitle"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <TiWen />
    </p>
    <p v-if="activeKey === 'tab2'">
      <XinLv />
    </p>
    <p v-if="activeKey === 'tab3'">
      <XueYa />
    </p>
    <template #tabBarExtraContent><a href="#" style="color: #1951be">@中山医康养</a></template>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { Card } from 'ant-design-vue';
  import XueYa from './XueYa.vue';
  import TiWen from './TiWen.vue';
  import XinLv from './XinLv.vue';
  const loading = ref(true);
  const activeKey = ref('tab1');
  const a = inject('phone');
  console.log('接收参数', a);
  const tabListTitle = [
    {
      key: 'tab1',
      tab: '体温',
    },
    {
      key: 'tab2',
      tab: '心率',
    },
    {
      key: 'tab3',
      tab: '血压',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }

  setTimeout(() => {
    loading.value = false;
  }, 700);
</script>

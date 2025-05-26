<template>
  <div class="md:flex">
    <Card
      size="small"
      :loading="loading"
      title="我的预约"
      class="md:w-4/4 w-full !md:mt-0 !mt-4 cursor-pointer"
      :canExpan="false"
    >
      <BasicTable
        titleHelpMessage="温馨提醒"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
      />
      <template #extra>
        <a href="#" style="color: #1951be">@协作网</a>
      </template>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Card } from 'ant-design-vue';
  import { BasicColumn, BasicTable } from '/@/components/Table';
  const columns: BasicColumn[] = [
    {
      title: '专家',
      dataIndex: 'testInput',
      width: 230,
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'testTextarea',
      width: 130,
      align: 'center',
    },
    {
      title: '时间',
      dataIndex: 'testTextarea1',
      width: 130,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'testTextarea2',
      width: 130,
      align: 'center',
    },
  ];

  const dataSource = ref([
    {
      id: '1',
      testInput: '王长青',
      testTextarea: '口腔科',
      testTextarea1: '2024-10-21 10:30',
      testTextarea2: '待就诊',
    },
    {
      id: '2',
      testInput: '张啸然',
      testTextarea: '康复科',
      testTextarea1: '2024-03-12 11:30',
      testTextarea2: '已就诊',
    },
  ]);
  const loading = ref(true);
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  });
</script>

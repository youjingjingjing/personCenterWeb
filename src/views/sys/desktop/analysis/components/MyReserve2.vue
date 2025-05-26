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
  import { ref, onMounted, defineProps } from 'vue';
  import { Card } from 'ant-design-vue';
  import { BasicColumn, BasicTable } from '/@/components/Table';
  import { listAppointment } from '/@/api/sys/desktopApi';
  // const phone = '13021646422';
  const phone = defineProps({
    phone: {
      type: String, // 指定 phone 的类型为 String
      required: true, // 标记 phone 为必传 prop
      // 你可以在这里添加更多的验证规则，比如 default, validator 等
      default: '13021646422',
    },
  });
  interface reserve {
    id: string;
    zhuangtai: string;
    keshi: string;
    shijian: string;
    zhuanjia: string;
  }
  const columns: BasicColumn[] = [
    {
      title: '专家',
      dataIndex: 'zhuanjia',
      width: 230,
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'keshi',
      width: 130,
      align: 'center',
    },
    {
      title: '时间',
      dataIndex: 'shijian',
      width: 130,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'zhuangtai',
      width: 130,
      align: 'center',
    },
  ];
  const dataSource = ref<reserve>();

  // const dataSource = ref([
  //   {
  //     id: '1',
  //     zhuanjia: '王长青',
  //     keshi: '口腔科',
  //     shijian: '2024-10-21 10:30',
  //     zhuangtai: '待就诊',
  //   },
  //   {
  //     id: '2',
  //     zhuanjia: '张啸然',
  //     keshi: '康复科',
  //     shijian: '2024-03-12 11:30',
  //     zhuangtai: '已就诊',
  //   },
  // ]);
  const loading = ref(true);
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const data = await listAppointment(phone);
      // console.log(data);
      // 更新响应式引用
      dataSource.value = data;
      // 处理从 getBaseInfo 返回的数据
      // console.log(data);
      setTimeout(() => {
        loading.value = false;
      }, 500);
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });
</script>

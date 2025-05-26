<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4 cursor-pointer"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
      >
        <div class="py-4 flex md:flex-col">
          <Icon :icon="item.icon" :size="120" />
          <div class="text-2xl text-center">
            {{ item.value }}
            <span class="text-1xl">{{ item.danwei }}</span>
          </div>
          <!-- <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl text-center" /> -->
        </div>
        <template #extra>
          <a href="#" style="color: #1951be">@中山医康养</a>
        </template>
      </Card>
    </template>
    <Card title="近一年预约科室占比" size="small" class="md:w-2/4" :loading="loading">
      <div ref="chartRef" class="w-full h-50"></div>
      <template #extra>
        <a href="#" style="color: #1951be">@众阳云健康</a>
      </template>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, Ref, defineProps } from 'vue';
  // import { CountTo } from '/@/components/CountTo';
  import { Icon } from '/@/components/Icon';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { EChartsOption } from 'echarts';
  import { getNowInfo } from '/@/api/sys/desktopApi';
  const loading = ref(true);
  const growCardList = ref<GrowCardItem[]>();
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  interface GrowCardItem {
    icon: string;
    title: string;
    value: number;
    total: number;
    color: string;
    action: string;
    danwei: string;
  }
  const p = defineProps({
    phone: {
      type: String, // 指定 phone 的类型为 String
      required: true, // 标记 phone 为必传 prop
      // 你可以在这里添加更多的验证规则，比如 default, validator 等
      default: '13021646422',
    },
  });
  // console.log('手机号11', p);
  // const phone = '13021646422';
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const data = await getNowInfo(p);
      // console.log(data);
      // 更新响应式引用
      // nowInfo.value = data;
      const list: GrowCardItem[] = [
        {
          title: '实时心率',
          icon: 'xinlv1|svg',
          value: 0,
          danwei: 'bpm',
          total: 120000,
          color: 'green',
          action: '时',
        },
        {
          title: '实时体温',
          icon: 'tiwen|svg',
          value: 0,
          danwei: '℃',
          total: 500000,
          color: 'blue',
          action: '日',
        },
      ];
      list[0].value = data.daily.heartRate;
      list[1].value = data.daily.temperature;
      // 此处写后端 API 获取 list 数据
      growCardList.value = list;
      // 处理从 getBaseInfo 返回的数据
      // console.log(data);
      const options: EChartsOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          left: '60%',
          top: 'middle',
          width: 100,
        },
        series: [
          {
            color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
            name: '预约占比',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['38%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: data.departments,
            // data: [
            //   { value: 1048, name: '口腔科' },
            //   { value: 735, name: '康复科' },
            //   { value: 580, name: '体检科' },
            // ],
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 100;
            },
          },
        ],
      };
      setTimeout(() => {
        setOptions(options);
        loading.value = false;
      }, 500);
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });

  // onMounted(() => {
  // });
</script>

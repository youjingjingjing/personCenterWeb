<template>
  <Skeleton active :paragraph="{ rows: 5 }" :loading="loading">
    <div ref="chartRef" class="w-full h-50"></div>
  </Skeleton>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, computed, inject } from 'vue';
  import { Skeleton } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { EChartsOption } from 'echarts';
  import { listBloodPressure } from '/@/api/sys/desktopApi';

  const loading = ref(true);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  // 使用 ref 创建一个响应式引用
  const phone = inject('phone') ?? '13021646422';
  // 假设 listTemprature 返回的类型是一个包含 d 和 v 属性的对象
  interface TempratureResponse {
    d: string; // 假设这是时间或日期的数组
    high: number; // 假设这是对应的体温值数组
    low: number; // 假设这是对应的体温值数组
  }
  const chartDatas = ref<TempratureResponse[]>([]);
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const response = await listBloodPressure({ phone });
      console.log('血压图表', response);
      chartDatas.value = response;
      if (chartDatas.value) {
        const xAxisData = computed(() => chartDatas.value.map((item) => item.d));
        const seriesData1 = computed(() => chartDatas.value.map((item) => item.high));
        const seriesData2 = computed(() => chartDatas.value.map((item) => item.low));
        const options: EChartsOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData.value,
            // data: [
            //   '6:00',
            //   '7:00',
            //   '8:00',
            //   '9:00',
            //   '10:00',
            //   '11:00',
            //   '12:00',
            //   '13:00',
            //   '14:00',
            //   '15:00',
            //   '16:00',
            //   '17:00',
            //   '18:00',
            //   '19:00',
            //   '20:00',
            //   '21:00',
            //   '22:00',
            //   '23:00',
            // ],
          },
          yAxis: [
            {
              type: 'value',
              max: 140,
              min: 60,
              splitNumber: 4,
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              smooth: true,
              name: '收缩压(高压)',
              data: seriesData1.value,
              // data: [
              //   120, 115, 130, 105, 125, 135, 110, 100, 140, 128, 118, 132, 108, 122, 138, 112, 102,
              //   126, 136, 116,
              // ],
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#5ab1ef',
              },
            },
            {
              smooth: true,
              name: '舒张压(低压)',
              data: seriesData2.value,
              // data: [80, 75, 85, 70, 78, 82, 72, 65, 88, 84, 76, 86, 68, 74, 89, 71, 66, 79, 83, 77],
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#019680',
              },
            },
          ],
        };
        // 此处写后端 API 获取 options 数据
        setOptions(options);
        loading.value = false;
      }
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });
</script>

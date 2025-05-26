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
  import { listHeartRate } from '/@/api/sys/desktopApi';
  // 使用 ref 创建一个响应式引用
  // const phone = '13021646422';
  const phone = inject('phone') ?? '13021646422';
  // 假设 listTemprature 返回的类型是一个包含 d 和 v 属性的对象
  interface TempratureResponse {
    d: string; // 假设这是时间或日期的数组
    v: number; // 假设这是对应的体温值数组
  }
  const loading = ref(true);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const chartDatas = ref<TempratureResponse[]>([]);
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const response = await listHeartRate({ phone });
      console.log('体温图表', response);
      chartDatas.value = response;
      if (chartDatas.value) {
        const xAxisData = computed(() => chartDatas.value.map((item) => item.d));
        const seriesData = computed(() => chartDatas.value.map((item) => item.v));
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
              max: 90,
              min: 60,
              splitNumber: 4,
              axisLabel: {
                formatter: function (value) {
                  // 这里可以根据需要格式化刻度标签，例如只显示整数部分
                  return value.toFixed(1); // 保留一位小数
                },
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              smooth: true,
              name: '心率',
              data: seriesData.value,
              // data: [72, 85, 68, 90, 77, 64, 89, 96, 75, 65, 81, 93, 79, 62, 88, 97, 74, 66, 80, 95],
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

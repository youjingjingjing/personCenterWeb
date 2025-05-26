<template>
  <Skeleton active :paragraph="{ rows: 5 }" :loading="loading">
    <div ref="chartRef" class="w-full h-50"></div>
  </Skeleton>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, computed, defineProps, inject } from 'vue';
  import { Skeleton } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { EChartsOption } from 'echarts';
  import { listTemprature } from '/@/api/sys/desktopApi';
  // 使用 ref 创建一个响应式引用
  const phone = inject('phone') ?? '13021646422';
  const loading = ref(true);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  // 假设 listTemprature 返回的类型是一个包含 d 和 v 属性的对象
  interface TempratureResponse {
    d: string; // 假设这是时间或日期的数组
    v: number; // 假设这是对应的体温值数组
  }
  const chartDatas = ref<TempratureResponse[]>([]);
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const response = await listTemprature({ phone });
      // console.log('体温图表', response);
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
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: xAxisData.value,
            // data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          },
          yAxis: {
            type: 'value',
            max: 38, // 稍微扩大一些范围以容纳可能的异常值
            min: 35, // 稍微缩小一些范围以更加聚焦在常见体温
            splitNumber: 5, // 调整为 5，使得刻度更加稀疏一些
            interval: 0.5, // 如果需要，可以指定刻度间隔为 1
            axisLabel: {
              formatter: function (value) {
                // 这里可以根据需要格式化刻度标签，例如只显示整数部分
                return value.toFixed(1); // 保留一位小数
              },
            },
          },
          series: [
            {
              // data: [36.2, 35.8, 36.0, 35.4, 36.4, 36.1, 35.6],
              data: seriesData.value,
              type: 'line',
              name: '体温(℃)',
              smooth: true,
              areaStyle: {},
              itemStyle: {
                color: '#5ab1ef',
              },
            },
          ],
        };
        // 此处写后端 API 获取 options 数据
        setOptions(options);
        loading.value = false;
        // 更新响应式引用
        // 处理从 getBaseInfo 返回的数据
        // console.log(data);
      }
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });
</script>

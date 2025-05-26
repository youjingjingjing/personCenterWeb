<template>
  <Card>
    <div class="module_title">
      <div class="flex justify-between space-y-1">
        <div>
          <Avatar :size="{ md: 45 }" style="height: 45px; width: 45px">
            <template #icon>
              <img src="/resource/img/123.jpg" />
            </template>
          </Avatar>
          <span class="name ml-3">{{ propleInfo.patientName }}</span>
        </div>
        <div class="flex btn">
          <button style="color: #1951be; font-size: 14px">@众阳云健康</button>
          <Icon icon="open-left|svg" class="ml-2 mt-2" size="23" />
        </div>
      </div>
    </div>
    <div class="md:flex enter-y mt-1">
      <div class="mr-2 w-full">
        <div class="flex">
          <div class="flex">
            <div class="mr-2 item_title">性别</div>
            <div class="mr-2 content-title">{{ propleInfo.sex == '1' ? '男' : '女' }}</div>
          </div>
          <div class="flex">
            <div class="mr-2 item_title">年龄</div>
            <div class="mr-2 content-title">{{ propleInfo.age || '---' }}</div>
          </div>
        </div>
        <div class="hr-style"></div>
        <div class="second-line flex md:mt-2">
          <div class="flex">
            <div class="mr-2 item_title">身高</div>
            <div class="mr-2 content-title">{{ propleInfo.height || '---' }}cm</div>
          </div>
          <div class="flex">
            <div class="mr-2 item_title">体重</div>
            <div class="mr-2 content-title">{{ propleInfo.weight || '---' }}kg</div>
          </div>
          <div class="flex">
            <div class="mr-2 item_title">BMI</div>
            <div class="mr-2 content-title">{{ bmidata }}</div>
          </div>
        </div>
        <div class="hr-style"></div>
        <div class="flex md:mt-2">
          <div class="item_title">病症</div>
          <div class="ml-2 mr-2 content-title">{{ propleInfo.illness || '---' }}</div>
        </div>
        <div class="hr-style"></div>
        <div class="third-line"></div>
      </div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  // import { propleInfo, targetProperty } from './info-utils';
  // import InputForm from '/@/views/information/basicInformation/form.vue';
  // import { useDrawer } from '/@/components/Drawer';
  // import { Icon } from '/@/components/Icon';
  import { Card } from 'ant-design-vue';
  import { Avatar } from 'ant-design-vue';
  import { defineProps, computed } from 'vue';
  // import { ref, onMounted } from 'vue';
  // import { getBaseInfo } from '/@/api/sys/desktopApi';
  // // 使用 ref 创建一个响应式引用
  // const userInfo = ref({});
  // const phone = '13021646422';
  // onMounted(async () => {
  //   try {
  //     // 调用异步函数并等待结果
  //     const data = await getBaseInfo({
  //       phone: phone,
  //     });
  //     console.log(data);
  //     // 更新响应式引用
  //     userInfo.value = data;
  //     // 处理从 getBaseInfo 返回的数据
  //     // console.log(data);
  //   } catch (error) {
  //     // 处理从 getBaseInfo 抛出的错误
  //     console.error(error);
  //   }
  // });
  // const [registerDrawer, { openDrawer }] = useDrawer();
  // eslint-disable-next-line vue/require-prop-types
  // function eventclick() {
  //   openDrawer(true, { id: p.propleInfo.id });
  // }
  // eslint-disable-next-line vue/require-prop-types
  const p = defineProps(['propleInfo']);
  const bmidata = computed(() => {
    if (p.propleInfo && p.propleInfo.height && p.propleInfo.weight) {
      const heightInMeters = p.propleInfo.height / 100; // 将身高从厘米转换为米
      const bmi = p.propleInfo.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(2); // 直接返回格式化后的字符串
    }
    return '---'; // 如果缺少必要的数据，则返回占位符
  });
</script>
<style lang="less" scoped>
  .module_title {
    color: #009688;
    font-size: 22px;
    .btn {
      font-size: 18px;
      color: #557bfa;
      cursor: pointer;
    }
  }
  .hr-style {
    border-top: 1px solid #4CAF50;
  }

  .item_title {
    font-size: 14px;
    margin-top: 15px;
    color: #000000;
  }

  .content-title {
    color: #009688;
    font-size: 20px;
    // margin-bottom: 2px;
    margin-top: 5px;
    margin-right: 20px;
  }
  .align-right {
    justify-content: flex-end;
  }

  .tip-style {
    line-height: 0;
    font-size: smaller;
    font-weight: bold;
  }
</style>

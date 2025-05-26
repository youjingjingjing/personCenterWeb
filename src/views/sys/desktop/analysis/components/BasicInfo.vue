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
        </div>
        <!-- <div class="flex btn" @click="eventclick">
          <button class="tip-style">完善个人信息</button>
          <Icon icon="open-left|svg" class="ml-2 mt-2" size="23" />
        </div> -->
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
        <div class="flex flex-row-reverse p-1`">
          <button style="color: #1951be; font-size: 14px" @click="() => p.checkDetailedInfo()">查看详情</button>
        </div>
      </div>
    </div>
    <InputForm @register="registerDrawer" />
  </Card>
</template>
<script lang="ts" setup>
  // import { propleInfo, targetProperty } from './info-utils';
  import InputForm from '/@/views/information/basicInformation/form.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Icon } from '/@/components/Icon';
  import { Card } from 'ant-design-vue';
  import { Avatar } from 'ant-design-vue';
  import { defineProps, computed } from 'vue';
  import { ref, onMounted, getCurrentInstance } from 'vue';
  import { getBaseInfo } from '/@/api/sys/desktopApi';
  const p = defineProps(['checkDetailedInfo']);
  console.log(p);
  console.log(p.checkDetailedInfo);
  const phone = '13021646422';
  // 使用 ref 创建一个响应式引用
  const propleInfo = ref({
    id: '',
    height: 0,
    weight: 0,
  });
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const data = await getBaseInfo({
        phone: phone,
      });
      // console.log(data);
      // 更新响应式引用
      propleInfo.value = data;
      // 处理从 getBaseInfo 返回的数据
      // console.log(data);
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });
  const [registerDrawer, { openDrawer }] = useDrawer();
  // eslint-disable-next-line vue/require-prop-types
  function eventclick() {
    openDrawer(true, { id: propleInfo.value.id });
  }
  const bmidata = computed(() => {
    if (propleInfo.value && propleInfo.value.height && propleInfo.value.weight) {
      const heightInMeters = propleInfo.value.height / 100; // 将身高从厘米转换为米
      const bmi = propleInfo.value.weight / (heightInMeters * heightInMeters);
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
    font-size: 22px;
    margin-bottom: 5px;
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

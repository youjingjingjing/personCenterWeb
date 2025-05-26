<template>
  <div class="md:flex h-10">
    <div class="md:w-5/7">
      <a-input
        v-model="userName"
        class="!md:h-10"
        placeholder="请输入搜索内容"
        enter-button="Search"
        size="middle"
        allow-clear
        @search="handleSearch"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
        <template #suffix>
          <Select
            v-model:value="value"
            label-in-value
            :bordered="false"
            popup-class-name="test"
            style="width: 120px"
            :options="options"
            @change="handleChange"
          />
          <!-- <dropdown trigger="click" v-model="value2">
            <a class="ant-dropdown-link" @click.prevent>
              找专家
              <DownOutlined />
            </a>
            <template #overlay>
              <Menu @click="onClick">
                <menu-item key="1">找专家</menu-item>
                <menu-item key="2">找服务</menu-item>
              </Menu>
            </template>
          </dropdown> -->
        </template>
      </a-input>
    </div>
    <div class="flex justify-end md:w-2/7">
      <date-picker v-model:value="value1" class="md:h-10 ml-2 md:w-9/10" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { Dropdown, Menu, MenuItem, DatePicker, Select, SelectOption } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import type { MenuProps } from 'ant-design-vue';
  import type { Dayjs } from 'dayjs';
  const userName = ref<string>('');
  const value1 = ref<Dayjs>();
  const value2 = ref<string>('1');
  const onClick: MenuProps['onClick'] = ({ key }) => {
    alert(`Click on item ${key}`);
  };
  function handleSearch() {
    alert(1);
  }
  const options = ref<SelectProps['options']>([
    {
      value: '1',
      label: '找专家',
    },
    {
      value: '2',
      label: '找服务',
    },
  ]);
  const handleChange: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };

  const value = ref('1');
</script>
<style lang="less" scoped>
  // ::v-deep .ant-input-suffix {
  //   border-left: 1px solid #ddd;
  //   text-align: center;
  //   > span:first-child {
  //     display: none;
  //   }
  // }
  :deep(.ant-input-suffix) {
    border-left: 1px solid #ddd;
    text-align: center;
    > span:first-child {
      display: none;
    }
  }
</style>

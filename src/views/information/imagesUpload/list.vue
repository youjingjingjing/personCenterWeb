<!--
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
-->
<template>
  <div>
    <!-- 标题部分 -->
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center">
        <Icon :icon="getTitle.icon" class="m-1 pr-1" />
        <span class="text-lg font-semibold"> {{ getTitle.value }} </span>
      </div>
      <!-- <a-button
        class="ml-2"
        style="background: #6ee7b7; color: #065f46; border: none;"
        @click="loadData"
      >
        <Icon icon="ant-design:reload-outlined" /> 更新
      </a-button> -->
      <a-button type="primary" @click="handleForm({})" v-auth="'information:imagesUpload:edit'">
        <Icon icon="fluent:add-12-filled" /> {{ t('新增') }}
      </a-button>
    </div>

    <!-- 搜索表单 -->
    <!-- <BasicForm @register="registerForm" @submit="handleSearch" @reset="handleReset" /> -->
    <!-- 横向时间轴展示 -->
    <div class="horizontal-timeline-container">
      <div class="timeline-header-section">
        <div class="timeline-title">
          <Icon icon="ant-design:clock-circle-outlined" />
          <span>时间轴</span>
        </div>
      </div>
      <div class="horizontal-timeline-wrapper">
        <!-- 时间轴主线 -->
        <div class="timeline-main-line"></div>
        <!-- 时间轴项目 -->
        <div class="timeline-items-container">
          <div
            v-for="(record, index) in dataSource"
            :key="record.id"
            class="timeline-item"
            :class="{
              'timeline-item-top': index % 2 === 0,
              'timeline-item-bottom': index % 2 === 1,
            }"
          >
            <!-- 时间轴点 那个小闹钟-->
            <div class="timeline-dot">
              <Avatar size="small">
                <template #icon>
                  <Icon icon="ant-design:clock-circle-outlined" />
                </template>
              </Avatar>
            </div>
            <!-- 连接线 -->
            <div class="timeline-connector"></div>
            <!-- 卡片内容 -->
            <div class="timeline-card-wrapper">
              <div class="timeline-time">{{ record.time }}</div>
              <div class="timeline-card">
                <div class="timeline-header">
                  <a @click="handleForm({ id: record.id })" class="timeline-type">
                    {{ record.type }}
                  </a>
                  <div class="timeline-actions">
                    <Button
                      size="small"
                      type="link"
                      @click="handleForm({ id: record.id })"
                      v-auth="'information:imagesUpload:edit'"
                    >
                      <Icon icon="clarity:note-edit-line" />
                      {{ t('编辑') }}
                    </Button>
                    <Popconfirm
                      :title="t('是否确认删除健康动态')"
                      @confirm="handleDelete(record)"
                      v-auth="'information:imagesUpload:edit'"
                    >
                      <Button size="small" type="link" danger>
                        <Icon icon="ant-design:delete-outlined" />
                        {{ t('删除') }}
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
                <div class="timeline-body">
                  <div class="timeline-other" v-if="record.other">
                    <span class="timeline-label">{{ t('其他') }}:</span>
                    <span>{{ record.other }}</span>
                  </div>
                  <div class="timeline-description" v-if="record.description">
                    <span class="timeline-label">{{ t('描述') }}:</span>
                    <span>{{ record.description }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-4 flex justify-center" v-if="pagination.total > 0">
      <Pagination
        v-model:current="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        show-size-changer
        :page-size-options="['5', '10', '15', '25', '50']"
        show-quick-jumper
        :show-total="(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`"
        @change="handlePageChange"
        @show-size-change="handlePageSizeChange"
      />
    </div>

    <InputForm @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="ViewsInformationImagesUploadList">
  import { ref, unref, onMounted } from 'vue';
  import { Timeline, Avatar, Button, Popconfirm, Pagination } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, FormProps, useForm } from '/@/components/Form';
  import {
    imagesUploadDelete,
    imagesUploadListData,
    ImagesUpload,
  } from '/@/api/information/imagesUpload';
  import { useDrawer } from '/@/components/Drawer';
  // @ts-ignore
  import InputForm from './form.vue';

  // 注册组件
  const TimelineItem = Timeline.Item;
  const { t } = useI18n('information.imagesUpload');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);

  const getTitle = {
    icon: meta.icon || 'ant-design:book-outlined',
    value: meta.title || t('健康动态管理'),
  };
  // 响应式数据
  const dataSource = ref<ImagesUpload[]>([]);
  const loading = ref(false);
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 搜索表单配置
  const searchForm: FormProps = {
    baseColProps: { lg: 6, md: 8 },
    labelWidth: 90,
    schemas: [
      {
        label: t('时间'),
        field: 'time',
        component: 'DatePicker',
        componentProps: {
          format: 'YYYY-MM-DD',
        },
      },
      {
        label: t('类型'),
        field: 'type',
        component: 'Input',
      },
    ],
  };

  const [registerForm, { getFieldsValue, resetFields }] = useForm(searchForm);
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 加载数据
  async function loadData() {
    try {
      loading.value = true;
      const searchData = getFieldsValue();
      const params = {
        ...searchData,
        pageNo: pagination.value.current,
        pageSize: pagination.value.pageSize,
      };
      const res = await imagesUploadListData(params);
      dataSource.value = res.list || [];
      pagination.value.total = res.count || 0;
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      loading.value = false;
    }
  }

  // 搜索
  function handleSearch() {
    pagination.value.current = 1;
    loadData();
  }

  // 重置搜索
  function handleReset() {
    resetFields();
    pagination.value.current = 1;
    loadData();
  }

  // 分页变化
  function handlePageChange(page: number, pageSize: number) {
    pagination.value.current = page;
    pagination.value.pageSize = pageSize;
    loadData();
  }

  // 分页大小变化
  function handlePageSizeChange(current: number, size: number) {
    pagination.value.current = 1;
    pagination.value.pageSize = size;
    loadData();
  }

  // 打开表单
  function handleForm(record: Recordable) {
    openDrawer(true, record);
  }

  // 删除记录
  async function handleDelete(record: Recordable) {
    const params = { id: record.id };
    const res = await imagesUploadDelete(params);
    showMessage(res.message);
    handleSuccess(record);
  } // 操作成功后刷新
  function handleSuccess(record: Recordable) {
    loadData();
  }

  // 初始化
  onMounted(() => {
    loadData();
  });
</script>

<style lang="less" scoped>
  // 横向时间轴容器
  .horizontal-timeline-container {
    padding: 25px 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 100%);
    border-radius: 16px;
    margin: 15px 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #667eea 50%, transparent 100%);
    }
  }

  .timeline-header-section {
    margin-bottom: 20px;

    .timeline-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 600;
      color: #475569;

      .anticon {
        color: #667eea;
        font-size: 24px;
      }
    }
  }

  .horizontal-timeline-wrapper {
    position: relative;
    padding: 30px 0;
    min-height: 250px;
  }

  // 时间轴主线
  .timeline-main-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    width: 250%;
    background: linear-gradient(
      90deg,
      #667eea 0%,
      #764ba2 25%,
      #667eea 50%,
      #764ba2 75%,
      #667eea 100%
    );
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(
        90deg,
        rgba(102, 126, 234, 0.2) 0%,
        rgba(118, 75, 162, 0.2) 50%,
        rgba(102, 126, 234, 0.2) 100%
      );
      border-radius: 4px;
      z-index: -1;
    }
  }

  // 时间轴项目容器
  .timeline-items-container {
    display: flex;
    gap: 20px;
    position: relative;
    z-index: 2;
    padding: 0 40px;
    align-items: stretch; // 让所有item以主线为中心
  }

  // 时间轴项目
  .timeline-item {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 280px;
    // 新增：默认主线居中
    // 上方项目
    // margin-bottom: 350px;
    &.timeline-item-top {
      justify-content: flex-end;
      // position: absolute;
      // bottom: 50%; // 让整个item紧贴主线上方
      // margin: auto;
      margin-bottom: 310px;
      // position: relative;
      // padding-bottom: 30px;
      .timeline-card-wrapper {
        order: 1;
        margin-bottom: 15px;
      }

      .timeline-dot {
        order: 2;
      }

      .timeline-connector {
        order: 3;
        margin-top: -2px;
      }
    }

    // 下方项目
    &.timeline-item-bottom {
      justify-content: flex-top;
      margin-top: 315px;
      .timeline-connector {
        order: 1;
        margin-bottom: -2px;
      }

      .timeline-dot {
        order: 2;
      }

      .timeline-card-wrapper {
        order: 3;
        margin-top: 15px;
      }
    }
  }

  // 时间轴点
  .timeline-dot {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 5px solid #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 3;

    :deep(.ant-avatar) {
      background: transparent;
      color: #fff;
      border: none;
      width: 30px;
      height: 30px;

      .anticon {
        font-size: 18px;
      }
    }

    &:hover {
      transform: scale(1.15);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }

    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.2) 0%,
        rgba(118, 75, 162, 0.2) 100%
      );
      border-radius: 50%;
      z-index: -1;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.3s ease;
    }

    &:hover::before {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  // 连接线
  .timeline-connector {
    width: 3px;
    height: 45px;
    background: linear-gradient(
      to bottom,
      rgba(102, 126, 234, 0.8) 0%, 
      rgba(102, 126, 234, 0.4) 100%
    );
    border-radius: 1.5px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -1px;
      top: 0;
      bottom: 0;
      width: 5px;
      background: linear-gradient(to bottom, 
        rgba(255, 255, 255, 0.3) 0%, 
        transparent 50%, 
        rgba(255, 255, 255, 0.3) 100%
      );
      border-radius: 2.5px;
    }
  }

  // 卡片包装器
  .timeline-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 350px;
  }

  .timeline-time {
    font-weight: 700;
    color: #475569;
    font-size: 14px;
    text-align: center;
    padding: 6px 12px;
    background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
    border-radius: 16px;
    border: 2px solid #e2e8f0;
    box-shadow: 0 3px 12px rgba(71, 85, 105, 0.08);
    margin-bottom: 8px;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(71, 85, 105, 0.12);
      border-color: #cbd5e1;
    }
  }

  .timeline-card {
    background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 6px 25px rgba(71, 85, 105, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    width: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 45px rgba(71, 85, 105, 0.12);
      border-color: #cbd5e1;

      &::before {
        transform: scaleX(1);
      }
    }
  }

  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f4ff;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 1px;
    }
  }

  .timeline-type {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
      text-decoration: none;
      color: #fff;
    }
  }

  .timeline-actions {
    display: flex;
    gap: 8px;
    margin-left: 6px;

    :deep(.ant-btn) {
      border-radius: 8px;
      height: 32px;
      padding: 0 12px;
      font-size: 12px;
      font-weight: 500;
      border: none;
      transition: all 0.3s ease;

      &.ant-btn-link {
        // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        // color: #fff;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: #fff;

        &:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          color: #fff;
        }
      }

      &.ant-btn-dangerous {
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
        color: #fff;

        &:hover {
          background: linear-gradient(135deg, #ff5252 0%, #e91e63 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
          color: #fff;
        }
      }
    }
  }

  .timeline-body {
    .timeline-other,
    .timeline-description {
      margin-bottom: 10px;
      padding: 10px 12px;
      background: linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%);
      border-radius: 8px;
      border-left: 3px solid #667eea;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #f0f2ff 0%, #e8ebff 100%);
        transform: translateX(3px);
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .timeline-label {
      font-weight: 600;
      color: #667eea;
      margin-right: 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    span:not(.timeline-label) {
      color: #2c3e50;
      line-height: 1.5;
      font-size: 14px;
    }
  }

  // 响应式设计
  @media (max-width: 1200px) {
    .timeline-items-container {
      gap: 30px;
    }

    .timeline-item {
      min-width: 240px;
    }
  }

  @media (max-width: 768px) {
    .horizontal-timeline-container {
      padding: 20px 15px;
    }
    .timeline-items-container {
      gap: 25px;
      padding: 0 20px;
    }
    
    .timeline-item {
      min-width: 200px;
    }
    
    .timeline-card {
      padding: 12px;
    }
    
    .timeline-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    
    .timeline-actions {
      align-self: flex-end;
    }
    
    .timeline-dot {
      width: 40px;
      height: 40px;

      :deep(.ant-avatar) {
        width: 24px;
        height: 24px;

        .anticon {
          font-size: 14px;
        }
      }
    }

    .timeline-connector {
      height: 40px;
    }
  }
</style>

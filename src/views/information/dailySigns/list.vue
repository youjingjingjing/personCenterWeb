<!--
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Icon :icon="getTitle.icon" class="m-1 pr-1" />
        <span> {{ getTitle.value }} </span>
      </template>
      <template #toolbar>
        <a-button type="default" @click="handleExport()">
          <Icon icon="ant-design:download-outlined" /> {{ t('导出') }}
        </a-button>
        <a-button type="default" @click="handleImport()">
          <Icon icon="ant-design:upload-outlined" /> {{ t('导入') }}
        </a-button>
        <a-button type="primary" @click="handleForm({})" v-auth="'information:dailySigns:edit'">
          <Icon icon="fluent:add-12-filled" /> {{ t('新增') }}
        </a-button>
      </template>
      <template #firstColumn="{ record }">
        <a @click="handleForm({ tid: record.tid })">
          {{ record.createTime }}
        </a>
      </template>
    </BasicTable>
    <InputForm @register="registerDrawer" @success="handleSuccess" />
    <FormImport @register="registerImportModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="ViewsInformationDailySignsList">
  import { unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGlobSetting } from '/@/hooks/setting';
  import { downloadByUrl } from '/@/utils/file/download';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, BasicColumn, useTable } from '/@/components/Table';
  import { dailySignsDelete, dailySignsListData } from '/@/api/information/dailySigns';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { FormProps } from '/@/components/Form';
  import InputForm from './form.vue';
  import FormImport from './formImport.vue';

  const { t } = useI18n('information.dailySigns');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);

  const getTitle = {
    icon: meta.icon || 'ant-design:book-outlined',
    value: meta.title || t('日常体征管理'),
  };

  const searchForm: FormProps = {
    baseColProps: { lg: 6, md: 8 },
    labelWidth: 90,
    schemas: [
      {
        label: t('上报时间'),
        field: 'createTime',
        component: 'DatePicker',
        componentProps: {
          format: 'YYYY-MM-DD',
          // format: 'YYYY-MM-DD HH:mm',
          // showTime: { format: 'HH:mm' },
        },
      },
      // {
      //   label: t('体重 (kg)'),
      //   field: 'weight',
      //   component: 'Input',
      // },
      // {
      //   label: t('心率 (次/分)'),
      //   field: 'heartRate',
      //   component: 'Input',
      // },
      // {
      //   label: t('呼吸频率 (次/分)'),
      //   field: 'breathe',
      //   component: 'Input',
      // },
      // {
      //   label: t('收缩压 (mmHg)'),
      //   field: 'systolicPressure',
      //   component: 'Input',
      // },
      // {
      //   label: t('舒张压 (mmHg)'),
      //   field: 'diastolicPressure',
      //   component: 'Input',
      // },
      // {
      //   label: t('血糖 (mmol/L)'),
      //   field: 'bloodSugar',
      //   component: 'Input',
      // },
    ],
  };

  const tableColumns: BasicColumn[] = [
    {
      title: t('上报时间'),
      dataIndex: 'createTime',
      key: 'a.create_time',
      sorter: true,
      width: 230,
      align: 'center',
      slot: 'firstColumn',
    },
    {
      title: t('体重 (kg)'),
      dataIndex: 'weight',
      key: 'a.weight',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('心率 (次/分)'),
      dataIndex: 'heartRate',
      key: 'a.heart_rate',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('呼吸频率 (次/分)'),
      dataIndex: 'breathe',
      key: 'a.breathe',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('收缩压 (mmHg)'),
      dataIndex: 'systolicPressure',
      key: 'a.systolic_pressure',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('舒张压 (mmHg)'),
      dataIndex: 'diastolicPressure',
      key: 'a.diastolic_pressure',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('血糖 (mmol/L)'),
      dataIndex: 'bloodSugar',
      key: 'a.blood_sugar',
      sorter: true,
      width: 130,
      align: 'center',
    },
  ];

  const actionColumn: BasicColumn = {
    width: 160,
    actions: (record: Recordable) => [
      {
        icon: 'clarity:note-edit-line',
        title: t('编辑日常体征'),
        onClick: handleForm.bind(this, { tid: record.tid }),
        auth: 'information:dailySigns:edit',
      },
      {
        icon: 'ant-design:delete-outlined',
        color: 'error',
        title: t('删除日常体征'),
        popConfirm: {
          title: t('是否确认删除日常体征'),
          confirm: handleDelete.bind(this, record),
        },
        auth: 'information:dailySigns:edit',
      },
    ],
  };

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, getForm }] = useTable({
    api: dailySignsListData,
    beforeFetch: (params) => {
      return params;
    },
    columns: tableColumns,
    actionColumn: actionColumn,
    formConfig: searchForm,
    showTableSetting: true,
    useSearchForm: true,
    canResize: true,
  });

  function handleForm(record: Recordable) {
    openDrawer(true, record);
  }

  async function handleExport() {
    const { ctxAdminPath } = useGlobSetting();
    downloadByUrl({
      url: ctxAdminPath + '/information/dailySigns/exportData',
      params: getForm().getFieldsValue(),
    });
  }

  const [registerImportModal, { openModal: importModal }] = useModal();

  function handleImport() {
    importModal(true, {});
  }

  async function handleDelete(record: Recordable) {
    const params = { tid: record.tid };
    const res = await dailySignsDelete(params);
    showMessage(res.message);
    handleSuccess(record);
  }

  function handleSuccess(record: Recordable) {
    reload({ record });
  }
</script>

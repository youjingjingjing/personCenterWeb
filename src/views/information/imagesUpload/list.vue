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
        <a-button type="primary" @click="handleForm({})" v-auth="'information:imagesUpload:edit'">
          <Icon icon="fluent:add-12-filled" /> {{ t('新增') }}
        </a-button>
      </template>
      <template #firstColumn="{ record }">
        <a @click="handleForm({ id: record.id })">
          {{ record.type }}
        </a>
      </template>
    </BasicTable>
    <InputForm @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="ViewsInformationImagesUploadList">
  import { unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, BasicColumn, useTable } from '/@/components/Table';
  import { imagesUploadDelete, imagesUploadListData } from '/@/api/information/imagesUpload';
  import { useDrawer } from '/@/components/Drawer';
  import { FormProps } from '/@/components/Form';
  import InputForm from './form.vue';

  const { t } = useI18n('information.imagesUpload');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);

  const getTitle = {
    icon: meta.icon || 'ant-design:book-outlined',
    value: meta.title || t('健康动态管理'),
  };

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
          // format: 'YYYY-MM-DD HH:mm',
          // showTime: { format: 'HH:mm' },
        },
      },
      {
        label: t('类型'),
        field: 'type',
        component: 'Input',
      },
      // {
      //   label: t('其他'),
      //   field: 'other',
      //   component: 'Input',
      // },
      // {
      //   label: t('描述'),
      //   field: 'description',
      //   component: 'Input',
      // },
    ],
  };

  const tableColumns: BasicColumn[] = [
    {
      title: t('时间'),
      dataIndex: 'time',
      key: 'a.time',
      sorter: true,
      width: 200,
      align: 'center',
    },
    {
      title: t('类型'),
      dataIndex: 'type',
      key: 'a.type',
      sorter: true,
      width: 180,
      align: 'center',
      slot: 'firstColumn',
    },
    {
      title: t('其他'),
      dataIndex: 'other',
      key: 'a.other',
      sorter: true,
      width: 180,
      align: 'center',
    },
    {
      title: t('描述'),
      dataIndex: 'description',
      key: 'a.description',
      sorter: true,
      // width: 130,
      align: 'left',
    },
  ];

  const actionColumn: BasicColumn = {
    width: 160,
    actions: (record: Recordable) => [
      {
        icon: 'clarity:note-edit-line',
        title: t('编辑健康动态'),
        onClick: handleForm.bind(this, { id: record.id }),
        auth: 'information:imagesUpload:edit',
      },
      {
        icon: 'ant-design:delete-outlined',
        color: 'error',
        title: t('删除健康动态'),
        popConfirm: {
          title: t('是否确认删除健康动态'),
          confirm: handleDelete.bind(this, record),
        },
        auth: 'information:imagesUpload:edit',
      },
    ],
  };

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    api: imagesUploadListData,
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

  async function handleDelete(record: Recordable) {
    const params = { id: record.id };
    const res = await imagesUploadDelete(params);
    showMessage(res.message);
    handleSuccess(record);
  }

  function handleSuccess(record: Recordable) {
    reload({ record });
  }
</script>

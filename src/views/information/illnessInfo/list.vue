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
        <a-button type="primary" @click="handleForm({})" v-auth="'information:illnessInfo:edit'">
          <Icon icon="fluent:add-12-filled" /> {{ t('新增') }}
        </a-button>
      </template>
      <template #firstColumn="{ record }">
        <a @click="handleForm({ tid: record.tid })">
          {{ record.illnessType }}
        </a>
      </template>
    </BasicTable>
    <InputForm @register="registerDrawer" @success="handleSuccess" />
    <FormImport @register="registerImportModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="ViewsInformationIllnessInfoList">
  import { unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGlobSetting } from '/@/hooks/setting';
  import { downloadByUrl } from '/@/utils/file/download';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, BasicColumn, useTable } from '/@/components/Table';
  import { illnessInfoDelete, illnessInfoListData } from '/@/api/information/illnessInfo';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { FormProps } from '/@/components/Form';
  import InputForm from './form.vue';
  import FormImport from './formImport.vue';

  const { t } = useI18n('information.illnessInfo');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);

  const getTitle = {
    icon: meta.icon || 'ant-design:book-outlined',
    value: meta.title || t('疾病信息管理'),
  };

  const searchForm: FormProps = {
    baseColProps: { lg: 6, md: 8 },
    labelWidth: 90,
    schemas: [
      {
        label: t('疾病种类'),
        field: 'illnessType',
        component: 'Input',
      },
      {
        label: t('疾病名称'),
        field: 'illnessName',
        component: 'Input',
      },
    ],
  };

  const tableColumns: BasicColumn[] = [
    {
      title: t('疾病种类'),
      dataIndex: 'illnessType',
      key: 'a.illness_type',
      sorter: true,
      width: 230,
      align: 'left',
      slot: 'firstColumn',
    },
    {
      title: t('疾病名称'),
      dataIndex: 'illnessName',
      key: 'a.illness_name',
      sorter: true,
      width: 130,
      align: 'left',
    },
  ];

  const actionColumn: BasicColumn = {
    width: 160,
    actions: (record: Recordable) => [
      {
        icon: 'clarity:note-edit-line',
        title: t('编辑疾病信息'),
        onClick: handleForm.bind(this, { tid: record.tid }),
        auth: 'information:illnessInfo:edit',
      },
      {
        icon: 'ant-design:delete-outlined',
        color: 'error',
        title: t('删除疾病信息'),
        popConfirm: {
          title: t('是否确认删除疾病信息'),
          confirm: handleDelete.bind(this, record),
        },
        auth: 'information:illnessInfo:edit',
      },
    ],
  };

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, getForm }] = useTable({
    api: illnessInfoListData,
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
      url: ctxAdminPath + '/information/illnessInfo/exportData',
      params: getForm().getFieldsValue(),
    });
  }

  const [registerImportModal, { openModal: importModal }] = useModal();

  function handleImport() {
    importModal(true, {});
  }

  async function handleDelete(record: Recordable) {
    const params = { tid: record.tid };
    const res = await illnessInfoDelete(params);
    showMessage(res.message);
    handleSuccess(record);
  }

  function handleSuccess(record: Recordable) {
    reload({ record });
  }
</script>

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
        <a-button type="primary" @click="handleForm({})" v-auth="'information:basicInformation:edit'">
          <Icon icon="fluent:add-12-filled" /> {{ t('新增') }}
        </a-button>
      </template>
      <template #firstColumn="{ record }">
        <a @click="handleForm({ id: record.id })">
          {{ record.patientName }}
        </a>
      </template>
    </BasicTable>
    <InputForm @register="registerDrawer" @success="handleSuccess" />
    <FormImport @register="registerImportModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="ViewsInformationBasicInformationList">
  import { unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGlobSetting } from '/@/hooks/setting';
  import { downloadByUrl } from '/@/utils/file/download';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, BasicColumn, useTable } from '/@/components/Table';
  import { basicInformationDelete, basicInformationListData } from '/@/api/information/basicInformation';
  import { areaTreeData } from '/@/api/sys/area';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { FormProps } from '/@/components/Form';
  import InputForm from './form.vue';
  import FormImport from './formImport.vue';

  const { t } = useI18n('information.basicInformation');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);

  const getTitle = {
    icon: meta.icon || 'ant-design:book-outlined',
    value: meta.title || t('信息管理'),
  };

  const searchForm: FormProps = {
    baseColProps: { lg: 6, md: 8 },
    labelWidth: 90,
    schemas: [
      {
        label: t('患者姓名'),
        field: 'patientName',
        component: 'Input',
      },
      {
        label: t('性别'),
        field: 'sex',
        component: 'RadioGroup',
        componentProps: {
          dictType: 'sys_user_sex',
        },
      },
      {
        label: t('婚姻状态'),
        field: 'maritalStatus',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
        },
      },
      {
        label: t('身份证号'),
        field: 'identificationNumber',
        component: 'Input',
      },
      {
        label: t('生日'),
        field: 'birthday',
        component: 'DatePicker',
        componentProps: {
          format: 'YYYY-MM-DD HH:mm',
          showTime: { format: 'HH:mm' },
        },
      },
      {
        label: t('年龄'),
        field: 'age',
        component: 'Input',
      },
      {
        label: t('患者电话'),
        field: 'patientPhone',
        component: 'Input',
      },
      {
        label: t('民族'),
        field: 'ethnic',
        component: 'Input',
      },
      {
        label: t('籍贯'),
        field: 'origin',
        component: 'TreeSelect',
        componentProps: {
          api: areaTreeData,
          allowClear: true,
        },
      },
      {
        label: t('职业'),
        field: 'occupation',
        component: 'Input',
      },
      {
        label: t('文化程度'),
        field: 'education',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
        },
      },
      {
        label: t('医保情况'),
        field: 'healthInsurance',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
        },
      },
      {
        label: t('居住地区'),
        field: 'residentialArea',
        component: 'TreeSelect',
        componentProps: {
          api: areaTreeData,
          allowClear: true,
        },
      },
      {
        label: t('地址'),
        field: 'address',
        component: 'Input',
      },
      {
        label: t('所患疾病'),
        field: 'illness',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
          mode: 'multiple',
        },
      },
      {
        label: t('身高'),
        field: 'height',
        component: 'Input',
      },
      {
        label: t('饮酒情况'),
        field: 'alcoholConsumption',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
        },
      },
      {
        label: t('吸烟情况'),
        field: 'smokingSituation',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
        },
      },
      {
        label: t('运动情况'),
        field: 'sportsSituation',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
        },
      },
      {
        label: t('运动方式'),
        field: 'modeOfMotion',
        component: 'Select',
        componentProps: {
          dictType: '',
          allowClear: true,
          mode: 'multiple',
        },
      },
      {
        label: t('生活以静坐为主'),
        field: 'meditationSituation',
        component: 'RadioGroup',
        componentProps: {
          dictType: 'sys_yes_no',
        },
      },
    ],
  };

  const tableColumns: BasicColumn[] = [
    {
      title: t('患者姓名'),
      dataIndex: 'patientName',
      key: 'a.patient_name',
      sorter: true,
      width: 230,
      align: 'left',
      slot: 'firstColumn',
    },
    {
      title: t('性别'),
      dataIndex: 'sex',
      key: 'a.sex',
      sorter: true,
      width: 130,
      align: 'center',
      dictType: 'sys_user_sex',
    },
    {
      title: t('婚姻状态'),
      dataIndex: 'maritalStatus',
      key: 'a.marital_status',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('身份证号'),
      dataIndex: 'identificationNumber',
      key: 'a.identification_number',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('生日'),
      dataIndex: 'birthday',
      key: 'a.birthday',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('年龄'),
      dataIndex: 'age',
      key: 'a.age',
      sorter: true,
      width: 130,
      align: 'center',
    },
    {
      title: t('患者电话'),
      dataIndex: 'patientPhone',
      key: 'a.patient_phone',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('民族'),
      dataIndex: 'ethnic',
      key: 'a.ethnic',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('籍贯'),
      dataIndex: '',
      key: 'a.origin',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('职业'),
      dataIndex: 'occupation',
      key: 'a.occupation',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('文化程度'),
      dataIndex: 'education',
      key: 'a.education',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('医保情况'),
      dataIndex: 'healthInsurance',
      key: 'a.health_insurance',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('居住地区'),
      dataIndex: '',
      key: 'a.residential_area',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('地址'),
      dataIndex: 'address',
      key: 'a.address',
      sorter: true,
      width: 130,
      align: 'left',
    },
    {
      title: t('所患疾病'),
      dataIndex: 'illness',
      key: 'a.illness',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('身高'),
      dataIndex: 'height',
      key: 'a.height',
      sorter: true,
      width: 130,
      align: 'right',
    },
    {
      title: t('饮酒情况'),
      dataIndex: 'alcoholConsumption',
      key: 'a.alcohol_consumption',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('吸烟情况'),
      dataIndex: 'smokingSituation',
      key: 'a.smoking_situation',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('运动情况'),
      dataIndex: 'sportsSituation',
      key: 'a.sports_situation',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('运动方式'),
      dataIndex: 'modeOfMotion',
      key: 'a.mode_of_motion',
      sorter: true,
      width: 130,
      align: 'left',
      dictType: '',
    },
    {
      title: t('生活以静坐为主'),
      dataIndex: 'meditationSituation',
      key: 'a.meditation_situation',
      sorter: true,
      width: 130,
      align: 'center',
      dictType: 'sys_yes_no',
    },
  ];

  const actionColumn: BasicColumn = {
    width: 160,
    actions: (record: Recordable) => [
      {
        icon: 'clarity:note-edit-line',
        title: t('编辑信息'),
        onClick: handleForm.bind(this, { id: record.id }),
        auth: 'information:basicInformation:edit',
      },
      {
        icon: 'ant-design:delete-outlined',
        color: 'error',
        title: t('删除信息'),
        popConfirm: {
          title: t('是否确认删除信息'),
          confirm: handleDelete.bind(this, record),
        },
        auth: 'information:basicInformation:edit',
      },
    ],
  };

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, getForm }] = useTable({
    api: basicInformationListData,
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
      url: ctxAdminPath + '/information/basicInformation/exportData',
      params: getForm().getFieldsValue(),
    });
  }

  const [registerImportModal, { openModal: importModal }] = useModal();

  function handleImport() {
    importModal(true, {});
  }

  async function handleDelete(record: Recordable) {
    const params = { id: record.id };
    const res = await basicInformationDelete(params);
    showMessage(res.message);
    handleSuccess(record);
  }

  function handleSuccess(record: Recordable) {
    reload({ record });
  }
</script>

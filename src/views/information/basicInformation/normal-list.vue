<!--
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
-->
<template>
  <!-- <BasicDrawer
    v-bind="$attrs"
    :showFooter="true"
    :okAuth="'information:basicInformation:edit'"
    @register="registerDrawer"
    @ok="handleSubmit"
    width="60%"
  >
    <template #title>
      <Icon :icon="getTitle.icon" class="m-1 pr-1" />
      <span> {{ getTitle.value }} </span>
    </template>
    <BasicForm @register="registerForm" />
  </BasicDrawer> -->
</template>
<script lang="ts" setup name="ViewsInformationBasicInformationForm">
  import { ref, unref, computed } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import {
    BasicInformation,
    basicInformationSave,
    basicInformationForm,
  } from '/@/api/information/basicInformation';
  import { areaTreeData } from '/@/api/sys/area';
import { searchForWorkspaceRoot } from 'vite';

  const emit = defineEmits(['success', 'register']);

  const { t } = useI18n('information.basicInformation');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);
  const record = ref<BasicInformation>({} as BasicInformation);

  const getTitle = computed(() => ({
    icon: meta.icon || 'ant-design:book-outlined',
    value: record.value.isNewRecord ? t('新增信息') : t('编辑信息'),
  }));

  const inputFormSchemas: FormSchema[] = [
    {
      label: t('患者姓名'),
      field: 'patientName',
      component: 'Input',
      componentProps: {
        maxlength: 64,
      },
      rules: [
        { required: true },
        { pattern: /^[\u4e00-\u9fa5]{2,30}$/, message: t('请输入真实姓名') },
      ],
    },
    {
      label: t('性别'),
      field: 'sex',
      component: 'RadioGroup',
      componentProps: {
        dictType: 'sys_user_sex',
      },
      required: true,
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
      componentProps: {
        maxlength: 20,
      },
      required: true,
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
      rules: [{ pattern: /^\d+$/, message: t('请输入一个正整数') }],
    },
    {
      label: t('患者电话'),
      field: 'patientPhone',
      component: 'Input',
      componentProps: {
        maxlength: 20,
      },
      rules: [
        {
          pattern: /(^0[1-9]{1}\d{8,10}$)|(^1[3,4,5,6,7,8,9]\d{9}$)/g,
          message: t('请输入固话或手机号码'),
        },
      ],
    },
    {
      label: t('民族'),
      field: 'ethnic',
      component: 'Input',
      componentProps: {
        maxlength: 20,
      },
    },
    {
      label: t('籍贯'),
      field: 'origin',
      component: 'TreeSelect',
      componentProps: {
        api: areaTreeData,
        canSelectParent: false,
        allowClear: true,
      },
    },
    {
      label: t('职业'),
      field: 'occupation',
      component: 'Select',
      componentProps: {
        options: [
          { label: '农民', value: '农民' },
          { label: '工人', value: '工人' },
          { label: '公司职员', value: '公司职员' },
          { label: '公务员', value: '公务员' },
          { label: '事业单位工作人员', value: '事业单位工作人员' },
          { label: '军人', value: '军人' },
          { label: '自由职业者', value: '自由职业者' },
          { label: '商业、服务员工作人员', value: '商业、服务员工作人员' },
          { label: '私营业主、商人', value: '私营业主、商人' },
          { label: '学生', value: '学生' },
          { label: '退休', value: '退休' },
          { label: '其他人员', value: '其他人员' },
        ],
        allowClear: true,
      },
    },
    {
      label: t('文化程度'),
      field: 'education',
      component: 'Select',
      componentProps: {
        options: [
          { label: '文盲及半文盲', value: '文盲及半文盲' },
          { label: '小学', value: '小学' },
          { label: '初中', value: '初中' },
          { label: '高中', value: '高中' },
          { label: '技校/中专', value: '技校/中专' },
          { label: '大学专科', value: '大学专科' },
          { label: '大学本科', value: '大学本科' },
          { label: '研究生', value: '研究生' },
          { label: '博士生及以上', value: '博士生及以上' },
        ],
        allowClear: true,
      },
    },
    {
      label: t('医保情况'),
      field: 'healthInsurance',
      component: 'Select',
      componentProps: {
        options: [
          { label: '城镇职工基本医疗保险', value: '城镇职工基本医疗保险' },
          { label: '城镇居民基本医疗保险', value: '城镇居民基本医疗保险' },
          { label: '新型农村合作医疗', value: '新型农村合作医疗' },
          { label: '贫困救助', value: '贫困救助' },
          { label: '商业医疗保险', value: '商业医疗保险' },
          { label: '全公费', value: '全公费' },
          { label: '全自费', value: '全自费' },
        ],
        allowClear: true,
      },
    },
    {
      label: t('居住地区'),
      field: 'residentialArea',
      component: 'TreeSelect',
      componentProps: {
        api: areaTreeData,
        canSelectParent: false,
        allowClear: true,
      },
    },
    {
      label: t('地址'),
      field: 'address',
      component: 'Input',
      componentProps: {
        maxlength: 255,
      },
    },
    {
      label: t('所患疾病'),
      field: 'illness',
      component: 'ListSelect',
      componentProps: {
        selectType: 'illnessSelect',
        checkbox: 'true',
      },
      colProps: { lg: 24, md: 24 },
    },
    {
      label: t('饮酒情况'),
      field: 'alcoholConsumption',
      component: 'Select',
      componentProps: {
        options: [
          { label: '从不', value: '从不' },
          { label: '既往', value: '既往' },
          { label: '现在', value: '现在' },
        ],
        allowClear: true,
      },
      colProps: { lg: 24, md: 24 },
    },
    {
      label: t('吸烟情况'),
      field: 'smokingSituation',
      component: 'Select',
      componentProps: {
        options: [
          { label: '从不', value: '从不' },
          { label: '戒烟半年及以上', value: '戒烟半年及以上' },
          { label: '戒烟不到半年', value: '戒烟不到半年' },
          { label: '吸烟', value: '吸烟' },
        ],
        allowClear: true,
      },
    },
    {
      label: t('运动情况'),
      field: 'sportsSituation',
      component: 'Select',
      componentProps: {
        options: [
          { label: '每周一到两次', value: '每周一到两次' },
          { label: '每周三到四次', value: '每周三到四次' },
          { label: '每周五到六次', value: '每周五到六次' },
          { label: '每天', value: '每天' },
          { label: '不运动', value: '不运动' },
        ],
        allowClear: true,
      },
    },
    {
      label: t('运动方式'),
      field: 'modeOfMotion',
      component: 'Select',
      componentProps: {
        options: [
          { label: '步行', value: '步行' },
          { label: '慢跑', value: '慢跑' },
          { label: '脚踏车', value: '脚踏车' },
          { label: '游泳', value: '游泳' },
          { label: '抗阻运动', value: '抗阻运动' },
          { label: '其他', value: '其他' },
        ],
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
  ];

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: inputFormSchemas,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ loading: true });
    await resetFields();
    const res = await basicInformationForm(data);
    record.value = (res.basicInformation || {}) as BasicInformation;
    record.value.__t = new Date().getTime();
    setFieldsValue(record.value);
    setDrawerProps({ loading: false });
  });

  async function handleSubmit() {
    try {
      const data = await validate();
      setDrawerProps({ confirmLoading: true });
      const params: any = {
        isNewRecord: record.value.isNewRecord,
        id: record.value.id,
        userCode: record.value.userCode,
      };
      // console.log('submit', params, data, record);
      const res = await basicInformationSave(params, data);
      showMessage(res.message);
      setTimeout(closeDrawer);
      emit('success', data);
    } catch (error: any) {
      if (error && error.errorFields) {
        showMessage(t('common.validateError'));
      }
      console.log('error', error);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

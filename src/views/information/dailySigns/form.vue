<!--
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    :showFooter="true"
    :okAuth="'information:dailySigns:edit'"
    @register="registerDrawer"
    @ok="handleSubmit"
    width="60%"
  >
    <template #title>
      <Icon :icon="getTitle.icon" class="m-1 pr-1" />
      <span> {{ getTitle.value }} </span>
    </template>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="ViewsInformationDailySignsForm">
  import { ref, unref, computed } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { DailySigns, dailySignsSave, dailySignsForm } from '/@/api/information/dailySigns';
  import { basicInformationListData } from '/@/api/information/basicInformation';

  const emit = defineEmits(['success', 'register']);

  const { t } = useI18n('information.dailySigns');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);
  const record = ref<DailySigns>({} as DailySigns);

  const getTitle = computed(() => ({
    icon: meta.icon || 'ant-design:book-outlined',
    value: record.value.isNewRecord ? t('新增日常体征') : t('编辑日常体征'),
  }));

  const inputFormSchemas: FormSchema[] = [
    {
      label: t('体重 (kg)'),
      field: 'weight',
      component: 'Input',
      rules: [{ pattern: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/, message: t('请输入一个数值') }],
    },
    {
      label: t('心率 (次/分)'),
      field: 'heartRate',
      component: 'Input',
      rules: [{ pattern: /^\d+$/, message: t('请输入一个正整数') }],
    },
    {
      label: t('收缩压 (mmHg)'),
      field: 'systolicPressure',
      component: 'Input',
      rules: [{ pattern: /^\d+$/, message: t('请输入一个正整数') }],
    },
    {
      label: t('舒张压 (mmHg)'),
      field: 'diastolicPressure',
      component: 'Input',
      rules: [{ pattern: /^\d+$/, message: t('请输入一个正整数') }],
    },
    {
      label: t('血糖 (mmol/L)'),
      field: 'bloodSugar',
      component: 'Input',
      rules: [{ pattern: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/, message: t('请输入一个数值') }],
    },
    {
      label: t('呼吸频率 (次/分)'),
      field: 'breathe',
      component: 'Input',
      rules: [{ pattern: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/, message: t('请输入一个数值') }],
    },
    {
      label: t('上报时间'),
      field: 'createTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm',
        showTime: { format: 'HH:mm' },
      },
      required: true,
    },
  ];

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 140,
    schemas: inputFormSchemas,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ loading: true });
    await resetFields();
    const res = await dailySignsForm(data);
    record.value = (res.dailySigns || {}) as DailySigns;
    record.value.__t = new Date().getTime();
    setFieldsValue(record.value);
    setDrawerProps({ loading: false });
  });

  async function handleSubmit() {
    try {
      const data = await validate();
      const data2 = await basicInformationListData();
      const propleInfo = data2.list[0];
      data['identification'] = propleInfo.identificationNumber;
      setDrawerProps({ confirmLoading: true });
      const params: any = {
        isNewRecord: record.value.isNewRecord,
        tid: record.value.tid,
        userCode: record.value.userCode,
        identification: propleInfo.identificationNumber,
      };
      // console.log('submit', params, data, record);
      const res = await dailySignsSave(params, data);
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

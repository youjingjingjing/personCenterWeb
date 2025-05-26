<!--
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    :showFooter="true"
    :okAuth="'information:imagesUpload:edit'"
    @register="registerDrawer"
    @ok="handleSubmit"
    width="50%"
  >
    <template #title>
      <Icon :icon="getTitle.icon" class="m-1 pr-1" />
      <span> {{ getTitle.value }} </span>
    </template>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="ViewsInformationImagesUploadForm">
  import { ref, unref, computed } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { router } from '/@/router';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { ImagesUpload, imagesUploadSave, imagesUploadForm } from '/@/api/information/imagesUpload';
  import { basicInformationListData } from '/@/api/information/basicInformation';


  const emit = defineEmits(['success', 'register']);

  const { t } = useI18n('information.imagesUpload');
  const { showMessage } = useMessage();
  const { meta } = unref(router.currentRoute);
  const record = ref<ImagesUpload>({} as ImagesUpload);

  const getTitle = computed(() => ({
    icon: meta.icon || 'ant-design:book-outlined',
    value: record.value.isNewRecord ? t('新增健康动态') : t('编辑健康动态'),
  }));

  const inputFormSchemas: FormSchema[] = [
    {
      label: t('时间'),
      field: 'time',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm',
        showTime: { format: 'HH:mm' },
      },
      required: true,
    },
    {
      label: t('类型'),
      field: 'type',
      component: 'Select',
      componentProps: {
        options: [
          { label: '体检', value: '体检' },
          { label: '手术', value: '手术' },
          { label: '随访', value: '随访' },
          { label: '就诊', value: '就诊' },
          { label: '化验', value: '化验' },
          { label: '复查', value: '复查' },
          { label: '手术', value: '手术' },
          { label: '康复治疗', value: '康复治疗' },
          { label: '上门服务', value: '上门服务' },
          { label: '其他', value: '其他' },
        ],
        maxlength: 16,
      },
      required: true,
    },
    {
      label: t('其他'),
      field: 'other',
      component: 'Input',
      componentProps: {
        maxlength: 32,
      },
    },
    {
      label: t('描述'),
      field: 'description',
      component: 'InputTextArea',
      componentProps: {
        maxlength: 1000,
      },
    },
    {
      label: t('图片上传'),
      field: 'dataMap',
      component: 'Upload',
      componentProps: {
        loadTime: computed(() => record.value.__t),
        bizKey: computed(() => record.value.id),
        bizType: 'imagesUpload_image',
        uploadType: 'image',
      },
      colProps: { lg: 24, md: 24 },
    },
  ];

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: inputFormSchemas,
    baseColProps: { lg: 24, md: 48 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ loading: true });
    await resetFields();
    const res = await imagesUploadForm(data);
    record.value = (res.imagesUpload || {}) as ImagesUpload;
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
        id: record.value.id,
        userCode: record.value.userCode,
        identification: propleInfo.identificationNumber,
      };
      console.log('submit', params, data, record);
      const res = await imagesUploadSave(params, data);
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

import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn, BasicTableProps, FormProps } from '/@/components/Table';
import { userListData } from '/@/api/sys/user';
import { illnessInfoListData } from '/@/api/information/illnessInfo';

const { t } = useI18n('information.illnessInfo');

const modalProps = {
  title: t('疾病信息'),
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

const tableProps: BasicTableProps = {
  api: illnessInfoListData,
  beforeFetch: (params) => {
    params['isAll'] = true;
    return params;
  },
  columns: tableColumns,
  formConfig: searchForm,
  rowKey: 'illnessName',
};

export default {
  modalProps,
  tableProps,
  itemCode: 'illnessName',
  itemName: 'illnessName',
  isShowCode: true,
};

import { basicInformationListData } from '/@/api/information/basicInformation';
import { dailySignsListData } from '/@/api/information/dailySigns';

const data = await basicInformationListData();

console.log('single?', data.list);

const dailydata = await dailySignsListData();

const dailyList = dailydata.list;

dailyList.sort((item1, item2) => (item1?.createTime > item2?.createTime ? -1 : 1));

export let targetProperty: number | undefined;

dailyList.some((item) => {
  if (item.weight != null) {
    targetProperty = item.weight;
    return true;
  }
  return false;
});

export const propleInfo = data.list[0];

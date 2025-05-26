import { basicInformationListData } from '/@/api/information/basicInformation';

const data = await basicInformationListData();
export const userData = data.list[0];

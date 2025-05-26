/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
 */
import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { BasicModel, Page } from '../model/baseModel';
import { UploadApiResult } from '../sys/upload';
import { UploadFileParams } from '/#/axios';

const { ctxPath, adminPath } = useGlobSetting();

export interface BasicInformation extends BasicModel<BasicInformation> {
  userCode?: string; // user_code
  patientName?: string; // 患者姓名
  sex?: string; // 性别
  maritalStatus?: string; // 婚姻状态
  identificationNumber?: string; // 身份证号
  birthday?: string; // 生日
  age?: number; // 年龄
  patientPhone?: string; // 患者电话
  ethnic?: string; // 民族
  origin?: string; // 籍贯
  occupation?: string; // 职业
  education?: string; // 文化程度
  healthInsurance?: string; // 医保情况
  residentialArea?: string; // 居住地区
  address?: string; // 地址
  illness?: string; // 所患疾病
  height?: number; // 身高
  alcoholConsumption?: string; // 饮酒情况
  smokingSituation?: string; // 吸烟情况
  sportsSituation?: string; // 运动情况
  modeOfMotion?: string; // 运动方式
  meditationSituation?: string; // 生活以静坐为主
  biaoQian?: string; // 标签
  sheBaoKaHao?: string; // 社保卡号
  sheBaoXiaoFei?: decimal; // 社保消费
  sheBaoJieSuan?: decimal; // 社保结算
}

export const basicInformationList = (params?: BasicInformation | any) =>
  defHttp.get<BasicInformation>({ url: adminPath + '/information/basicInformation/list', params });

export const basicInformationListData = (params?: BasicInformation | any) =>
  defHttp.post<Page<BasicInformation>>({
    url: adminPath + '/information/basicInformation/listData',
    params,
  });

export const basicInformationForm = (params?: BasicInformation | any) =>
  defHttp.get<BasicInformation>({ url: adminPath + '/information/basicInformation/form', params });

export const basicInformationSave = (params?: any, data?: BasicInformation | any) =>
  defHttp.postJson<BasicInformation>({
    url: adminPath + '/information/basicInformation/save',
    params,
    data,
  });

export const basicInformationImportData = (
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defHttp.uploadFile<UploadApiResult>(
    {
      url: ctxPath + adminPath + '/information/basicInformation/importData',
      onUploadProgress,
    },
    params,
  );

export const basicInformationDelete = (params?: BasicInformation | any) =>
  defHttp.get<BasicInformation>({
    url: adminPath + '/information/basicInformation/delete',
    params,
  });

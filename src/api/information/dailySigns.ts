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

export interface DailySigns extends BasicModel<DailySigns> {
  userCode?: string; // 用户编码
  identification?: string; // 身份证号
  createTime?: string; // 创建时间
  weight?: number; // 体重（kg）
  heartRate?: number; // 心率（次/分）
  breathe?: number; // 呼吸频率（次/分）
  systolicPressure?: number; // 收缩压（mmHg）
  diastolicPressure?: number; // 舒张压(mmHg)
  bloodSugar?: number; // 血糖
}

export const dailySignsList = (params?: DailySigns | any) =>
  defHttp.get<DailySigns>({ url: adminPath + '/information/dailySigns/list', params });

export const dailySignsListData = (params?: DailySigns | any) =>
  defHttp.post<Page<DailySigns>>({ url: adminPath + '/information/dailySigns/listData', params });

export const dailySignsForm = (params?: DailySigns | any) =>
  defHttp.get<DailySigns>({ url: adminPath + '/information/dailySigns/form', params });

export const dailySignsSave = (params?: any, data?: DailySigns | any) =>
  defHttp.postJson<DailySigns>({ url: adminPath + '/information/dailySigns/save', params, data });

export const dailySignsImportData = (
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defHttp.uploadFile<UploadApiResult>(
    {
      url: ctxPath + adminPath + '/information/dailySigns/importData',
      onUploadProgress,
    },
    params,
  );

export const dailySignsDelete = (params?: DailySigns | any) =>
  defHttp.get<DailySigns>({ url: adminPath + '/information/dailySigns/delete', params });

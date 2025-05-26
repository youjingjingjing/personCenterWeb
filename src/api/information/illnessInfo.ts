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

export interface IllnessInfo extends BasicModel<IllnessInfo> {
  illnessType?: string; // 疾病种类
  illnessName?: string; // 疾病名称
}

export const illnessInfoList = (params?: IllnessInfo | any) =>
  defHttp.get<IllnessInfo>({ url: adminPath + '/information/illnessInfo/list', params });

export const illnessInfoListData = (params?: IllnessInfo | any) =>
  defHttp.post<Page<IllnessInfo>>({ url: adminPath + '/information/illnessInfo/listData', params });

export const illnessInfoForm = (params?: IllnessInfo | any) =>
  defHttp.get<IllnessInfo>({ url: adminPath + '/information/illnessInfo/form', params });

export const illnessInfoSave = (params?: any, data?: IllnessInfo | any) =>
  defHttp.postJson<IllnessInfo>({ url: adminPath + '/information/illnessInfo/save', params, data });

export const illnessInfoImportData = (
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defHttp.uploadFile<UploadApiResult>(
    {
      url: ctxPath + adminPath + '/information/illnessInfo/importData',
      onUploadProgress,
    },
    params,
  );

export const illnessInfoDelete = (params?: IllnessInfo | any) =>
  defHttp.get<IllnessInfo>({ url: adminPath + '/information/illnessInfo/delete', params });

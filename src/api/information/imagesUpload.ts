/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author laz
 */
import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { BasicModel, Page } from '../model/baseModel';

const { adminPath } = useGlobSetting();

export interface ImagesUpload extends BasicModel<ImagesUpload> {
  userCode?: string; // 用户编号
  identification?: string; // 身份证号
  type?: string; // 类型
  other?: string; // 其他
  time?: string; // 时间
  description?: string; // 描述
}

export const imagesUploadList = (params?: ImagesUpload | any) =>
  defHttp.get<ImagesUpload>({ url: adminPath + '/information/imagesUpload/list', params });

export const imagesUploadListData = (params?: ImagesUpload | any) =>
  defHttp.post<Page<ImagesUpload>>({
    url: adminPath + '/information/imagesUpload/listData',
    params,
  });

export const imagesUploadForm = (params?: ImagesUpload | any) =>
  defHttp.get<ImagesUpload>({ url: adminPath + '/information/imagesUpload/form', params });

export const imagesUploadSave = (params?: any, data?: ImagesUpload | any) =>
  defHttp.postJson<ImagesUpload>({
    url: adminPath + '/information/imagesUpload/save',
    params,
    data,
  });

export const imagesUploadDelete = (params?: ImagesUpload | any) =>
  defHttp.get<ImagesUpload>({ url: adminPath + '/information/imagesUpload/delete', params });

import { dailySignsListData } from '/@/api/information/dailySigns';

const dailydata = await dailySignsListData();

const dailyList = dailydata.list;

export interface DailySigns {
  weight?: number; // 体重
  heart_rate?: number; // 心率
  breathe?: number; // 呼吸
  systolic_pressure?: number; // 收缩压
  diastolic_pressure?: number; // 舒张压
  blood_sugar?: number; // 血糖
}

dailyList.sort((item1, item2) => (item1?.createTime > item2?.createTime ? -1 : 1));

export const targetList: DailySigns = {
  weight: -1,
  heart_rate: -1,
  breathe: -1,
  systolic_pressure: -1,
  diastolic_pressure: -1,
  blood_sugar: -1,
};

// dailyList.some((item) => {
//   if (item.weight != null) {
//     targetList.weight = item.weight;
//     return true;
//   }
//   return false;
// });

console.log('dailyList', dailyList);

// dailyList.some((item) => {
//   if (item.heartRate != null) {
//     targetList.heart_rate = item.heartRate;
//     return true;
//   }
//   return false;
// });

// dailyList.some((item) => {
//   if (item.breathe != null) {
//     targetList.breathe = item.breathe;
//     return true;
//   }
//   return false;
// });

// dailyList.some((item) => {
//   if (item.systolic_pressure != null) {
//     targetList.systolic_pressure = item.systolic_pressure;
//     return true;
//   }
//   return false;
// });

// dailyList.some((item) => {
//   if (item.diastolic_pressure != null) {
//     targetList.diastolic_pressure = item.diastolic_pressure;
//     return true;
//   }
//   return false;
// });

// dailyList.some((item) => {
//   if (item.bloodSugar != null) {
//     targetList.blood_sugar = item.blood_sugar;
//     return true;
//   }
//   return false;
// });

targetList.heart_rate = dailyList.find(
  (person) => person.heartRate !== undefined && person.heartRate !== 0,
)?.heartRate;
targetList.breathe = dailyList.find(
  (person) => person.breathe !== undefined && person.breathe !== 0,
)?.breathe;
targetList.systolic_pressure = dailyList.find(
  (person) => person.systolicPressure !== undefined && person.systolicPressure !== 0,
)?.systolicPressure;
targetList.diastolic_pressure = dailyList.find(
  (person) => person.diastolicPressure !== undefined && person.diastolicPressure !== 0,
)?.diastolicPressure;
targetList.blood_sugar = dailyList.find(
  (person) => person.bloodSugar !== undefined && person.bloodSugar !== 0,
)?.bloodSugar;

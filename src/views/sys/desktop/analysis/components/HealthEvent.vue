<template>
  <Card title="诊断建议" class="md:h-123">
    <!-- <div class="module_title"></div> -->
    <div class="schedule-calendar">
      <div class="calendar-box">
        <!-- 年月 -->
        <div class="calendar-top">
          <div class="yearMonth"> {{ currentYear }}年{{ currentMonth }}月 </div>
          <div class="today-btn" @click="toToday()">今天</div>
        </div>
        <!-- 星期 -->
        <div class="weekdays">
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
          <div>日</div>
        </div>
        <LeftOutlined @click="weekPre" style="position: absolute; top: 86px; left: 12px" />
        <!-- 日期 -->
        <div class="days-item">
          <div
            @click="pick(day, index)"
            v-for="(day, index) in days"
            :key="index"
            class="time-normal"
          >
            <!--今天-->
            <span
              v-if="
                day.getFullYear() == new Date().getFullYear() &&
                day.getMonth() == new Date().getMonth() &&
                day.getDate() == new Date().getDate()
              "
              :class="[curShow == true ? 'time-active' : '']"
              >{{ day.getDate() }}</span
            >
            <span v-else :class="[selectedCur == index ? 'time-active' : '']">{{
              day.getDate()
            }}</span>
            <div v-for="(item, index) in timeData" :key="index">
              <!-- <i class="dots"></i> -->
              <i
                class="dots"
                v-if="
                  item.scheduleAvailable == 1 &&
                  item.weeklyDate ==
                    formatDate(day.getFullYear(), day.getMonth() + 1, day.getDate())
                "
              ></i>
            </div>
          </div>
        </div>
        <RightOutlined
          class="ope-right"
          @click="weekNext"
          style="position: absolute; top: 86px; right: 12px"
        />
      </div>
      <div class="tips">
        <Card class="flex !md:my-4 !md:w-full" v-for="(item, idx) in timeData.tuijian" :key="idx">
          <template #cover>
            <Icon :icon="item.tubiao" :size="60" class="icon" />
          </template>
          <card-meta :title="item.biaoti" :description="item.miaoshu" class="desc">
            <template #avatar>
              <avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </card-meta>
          <div class="btn">
            <RightSquareOutlined style="font-size: 35px; color: #2ca7ff; cursor: pointer" />
          </div>
        </Card>
        <!-- <Card class="!md:my-4 flex !md:w-full">
          <template #cover>
            <Icon icon="yaoxiang|svg" :size="60" class="icon" />
          </template>
          <card-meta title="康复保健" description="每周四预约艾灸保健" class="desc">
            <template #avatar>
              <avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </card-meta>
          <div class="btn">
            <RightSquareOutlined style="font-size: 35px; color: #2ca7ff; cursor: pointer" />
          </div>
        </Card> -->
      </div>
    </div>
    <template #extra>
      <a href="#" style="color: #1951be">@协作网</a>
    </template>
  </Card>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Card, CardMeta } from 'ant-design-vue';
  import { LeftOutlined, RightOutlined, RightSquareOutlined } from '@ant-design/icons-vue';
  import { Icon } from '/@/components/Icon';
  import { listAdvice } from '/@/api/sys/desktopApi';
  // const phone = '13021646422';
  // const phone = defineProps({
  //   phone: {
  //     type: String, // 指定 phone 的类型为 String
  //     required: true, // 标记 phone 为必传 prop
  //     // 你可以在这里添加更多的验证规则，比如 default, validator 等
  //     default: '13021646422',
  //   },
  // });
  // console.log(phone);
  export default defineComponent({
    components: {
      Card,
      CardMeta,
      LeftOutlined,
      RightOutlined,
      RightSquareOutlined,
      Icon,
    },
    props: {
      phone: {
        type: String,
        // 在 Vue 2 中，required 通常是必需的；在 Vue 3 中，你也可以在 setup 中处理
        required: false, // 设置为 false，因为我们将从路由中获取或提供默认值
        default: '13021646422', // 当父组件没有提供 phone 时使用的默认值
      },
    },
    data() {
      return {
        // 日程
        timeData: [
          {
            scheduleAvailable: 1,
            weeklyDate: '',
            tuijian: [
              // {
              //   tubiao: '',
              //   biaoti: '补充维生素',
              //   neirong: '每日多吃蔬菜水果',
              // },
              // {
              //   tubiao: '',
              //   biaoti: '康复保健',
              //   neirong: '每周四预约艾灸保健',
              // },
            ],
          },
        ], //存放表格数据
        currentYear: '', // 年份
        currentMonth: '', // 月份
        currentDay: '', // 日期
        currentWeek: '', // 星期
        days: [],
        selectedCur: null, //选中的当前日期index
        timeNow: '', //今日
        curShow: true, //今日默认选中效果
        dateCur: null, //选中的当前日期
      };
    },
    mounted() {
      this.initData();
      this.getCurrentDate(); // 获取当前时间
      this.dateCur = this.timeNow;
      this.getScheduleData();
      this.listAdvice(this.timeNow);
    },
    methods: {
      async listAdvice(adate) {
        const params = {
          phone: this.phone,
          adate: adate,
        };
        const response = await listAdvice(params);
        // console.log('建议数据', response);
        this.timeData.tuijian = response;
      },
      //我的日程数据
      getScheduleData(time) {
        // console.log(time);
        // this.$http({
        //   url: this.$http.adornUrl('***/mySchedule'),
        //   method: 'get',
        //   params: {
        //     switchDate: time, //默认传空
        //   },
        // })
        //   .then((res) => {
        //     console.log('日程：', res);
        //     if (res.data && res.data.length) {
        //       this.timeData = res.data;
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
      // 我的日程-按周 开始
      toToday() {
        this.selectedCur = null;
        this.curShow = true;
        this.getCurrentDate(); // 获取当前时间
        this.initData(this.timeNow);
        this.dateCur = this.timeNow;
        this.getScheduleData(this.dateCur);
      },
      // 日期相关
      getDate() {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      getCurrentDate() {
        this.timeNow = this.getDate({
          format: true,
        });
        // console.log('今日：', this.timeNow);
      },
      formatDate(year, month, day) {
        const y = year;
        let m = month;
        if (m < 10) m = `0${m}`;
        let d = day;
        if (d < 10) d = `0${d}`;
        return `${y}-${m}-${d}`;
      },
      initData(cur) {
        let date = '';
        if (cur) {
          date = new Date(cur);
          console.log('qqqq:', date);
        } else {
          date = new Date();
        }
        this.currentDay = date.getDate(); // 今日日期 几号
        this.currentYear = date.getFullYear(); // 当前年份
        this.currentMonth = date.getMonth() + 1; // 当前月份
        this.currentWeek = date.getDay(); // 1...6,0   // 星期几
        if (this.currentWeek === 0) {
          this.currentWeek = 7;
        }
        const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay); // 今日日期 年-月-日
        this.timeData[0].weeklyDate = str;
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
        /* eslint-disabled */
        for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
          const d = new Date(str);
          d.setDate(d.getDate() - i);
          this.days.push(d);
        }
        for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
          const d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
      },
      //  上个星期
      weekPre() {
        const d = this.days[0]; // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() - 7);
        let preDate = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        console.log('上一周：', preDate);
        this.initData(d);
        this.getScheduleData(preDate);
        //点击上周时把点击选中清空
        this.selectedCur = null;
      },
      //  下个星期
      weekNext() {
        const d = this.days[6]; // 如果当期日期是7号或者小于7号
        d.setDate(d.getDate() + 7);
        let nextDate = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
        console.log('下一周：', nextDate);
        this.initData(d);
        this.getScheduleData(nextDate);
        // 点击下周时把点击选中清空
        this.selectedCur = null;
      },
      // 当前选择日期
      pick(date, index) {
        console.log(index);
        this.selectedCur = index;
        this.dateCur = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        if (this.timeNow == this.dateCur) {
          this.curShow = true;
        } else {
          this.curShow = false;
        }
        this.getScheduleData(this.dateCur);
        this.listAdvice(this.dateCur);
      },
      // 我的日程-按周 结束
    },
  });
</script>
<style lang="less" scoped>
  .module_title {
    color: #000000;
    font-size: large;
  }
  .tips {
    .active {
      background: #2ca7ff;
      color: #ecf6ff !important;
    }
    .icon {
      position: absolute;
      top: 20px;
      left: 40px;
    }
    .desc {
      margin-left: 100px;
    }
    .btn {
      position: absolute !important;
      right: 80px;
      top: 35px;
    }
    // :deep(.ant-card-body) {
    //   .ant-card-meta-title {
    //     color: #ecf6ff !important;
    //   }
    //   .ant-card-meta-description {
    //     color: #ecf6ff !important;
    //   }
    // }
  }
  /* 日程 */
  .schedule-calendar {
    background: #ecf6ff;
    border-radius: 8px;
    height: 123px;
    // margin-bottom: 10px;
    // margin-top: 20px;
  }
  .calendar-box {
    position: relative;
  }
  .schedule-list {
    /* height: calc(100% - 170px); */
    overflow: hidden;
    overflow-y: auto;
  }
  .schedule-list::-webkit-scrollbar {
    width: 5px;
  }
  .schedule-list::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #ccc;
  }
  .schedule-list::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #e7e7e7;
    border: 1px solid #cacaca;
  }
  .calendar-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .yearMonth {
    color: #666666;
    text-align: left;
    padding-top: 8px;
    padding-left: 15px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .today-btn {
    width: 60px;
    height: 25px;
    line-height: 25px;
    border-radius: 24px;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #faad14;
    font-size: 10px;
    color: #666666;
    cursor: pointer;
    margin-right: 5px;
    text-align: center;
  }
  .weekdays {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
    font-size: 14px;
    color: #666666;
  }
  .days-item {
    height: 46px;
    line-height: 46px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    font-weight: bold;
    color: #3d3d3d;
  }
  .time-normal {
    cursor: pointer;
    width: 37px;
    height: 46px;
  }
  .time-active {
    width: 37px;
    height: 46px;
    border-radius: 4px;
    background: linear-gradient(332deg, #2ca7ff -8%, #69bbff 58%, #90d5ff 112%);
    cursor: pointer;
    display: block;
  }
  i.dots {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: linear-gradient(180deg, #ffb00e 0%, #ff683f 100%);
    display: block;
    margin: 0 auto;
    margin-top: -13px;
  }
</style>

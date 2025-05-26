<template>
  <div>
    <div class="md:flex">
      <div class="enter-y md:w-1/2">
        <Search class="md:mb-2" />
        <SiteAnalysis class="enter-y mt-2" />
        <div class="mt-2">
          <NowInfo class="w-full" />
          <Report class="w-full mt-2" />
          <MyReserve class="w-full mt-2" />
        </div>
      </div>
      <div class="enter-y md:w-1/2">
        <BasicInfo class="w-full !md:mx-4 !md:my-0 h-2/8" :checkDetailedInfo="checkDetailedInfo" />
        <HealthEvent class="w-full !my-4 !md:mx-4 md:h-3/7" />
        <MedicalInsurance class="w-full !md:mx-4 h-2/8" :propleInfo="userInfo" />
      </div>
    </div>
  </div>
  <div class="popup" v-show="isDetailedInfoVisible">
    <div class="popup-inner">
      <button className="popup-close-button" @click="() => (isDetailedInfoVisible = false)"
        ><CloseOutlined
      /></button>
      <div class="flex flex-row h-full">
        <div class="flex-none w-90 h-full p-4">
          <div class="h-full flex justify-between flex-col">
            <div>
              <Avatar :size="{ md: 45 }" style="height: 45px; width: 45px">
                <template #icon>
                  <img src="/resource/img/123.jpg" />
                </template>
              </Avatar>
              <div class="flex">
                <div class="flex">
                  <div class="mr-2 item_title">性别</div>
                  <div class="mr-2 content-title">{{ userInfo.sex == '1' ? '男' : '女' }}</div>
                </div>
                <div class="flex">
                  <div class="mr-2 item_title">年龄</div>
                  <div class="mr-2 content-title">{{ userInfo.age || '---' }}</div>
                </div>
              </div>
              <div class="hr-style"></div>
              <div class="second-line flex md:mt-2">
                <div class="flex">
                  <div class="mr-2 item_title">身高</div>
                  <div class="mr-2 content-title">{{ userInfo.height || '---' }}cm</div>
                </div>
                <div class="flex">
                  <div class="mr-2 item_title">体重</div>
                  <div class="mr-2 content-title">{{ userInfo.weight || '---' }}kg</div>
                </div>
                <div class="flex">
                  <div class="mr-2 item_title">BMI</div>
                  <div class="mr-2 content-title">{{ bmidata }}</div>
                </div>
              </div>
              <div class="hr-style"></div>
              <div class="flex md:mt-2">
                <div class="item_title">病症</div>
                <div class="ml-2 mr-2 content-title">{{ userInfo.illness || '---' }}</div>
              </div>
            </div>
            <Divider />
            <div id="wordcloud"></div>
            <div class="flex-none flex justify-between">
              <Button type="primary">添加</Button>
              <Button type="primary">修改</Button>
            </div>
          </div>
        </div>
        <Divider type="vertical" style="height: 100%" />
        <div class="flex-auto p-3 h-full">
          <Tabs v-model:activeKey="tabKey" class="h-full">
            <TabPane key="1" tab="基础档案" class="h-full">
              <div class="flex flex-row justify-around h-full items-center">
                <Card class="h-6/7 w-3/7">
                  <div>
                    <label>身高：</label>
                    <span>{{ userInfo.height }}</span>
                  </div>
                  <div>
                    <label>体重：</label>
                    <span>{{ userInfo.weight }}</span>
                  </div>
                  <div>
                    <label>地址：</label>
                    <span>{{ userInfo.address }}</span>
                  </div>
                  <div>
                    <label>居住地区：</label>
                    <span>{{ userInfo.residentialArea }}</span>
                  </div>
                  <div>
                    <label>婚姻状态：</label>
                    <span>{{ userInfo.maritalStatus }}</span>
                  </div>
                  <div>
                    <label>身份证号：</label>
                    <span>{{ userInfo.identificationNumber }}</span>
                  </div>
                  <div>
                    <label>民族：</label>
                    <span>{{ userInfo.ethnic }}</span>
                  </div>
                  <div>
                    <label>籍贯：</label>
                    <span>{{ userInfo.origin }}</span>
                  </div>
                  <div>
                    <label>职业：</label>
                    <span>{{ userInfo.occupation }}</span>
                  </div>
                  <div>
                    <label>文化程度：</label>
                    <span>{{ userInfo.education }}</span>
                  </div>
                  <div>
                    <label>医保情况：</label>
                    <span>{{ userInfo.healthInsurance }}</span>
                  </div>
                  <div>
                    <label>社保卡号：</label>
                    <span>{{ userInfo.shebaoKahao }}</span>
                  </div>
                  <div>
                    <label>社保消费：</label>
                    <span>{{ userInfo.shebaoXiaofei }}</span>
                  </div>
                  <div>
                    <label>社保结算：</label>
                    <span>{{ userInfo.shebaoJiesuan }}</span>
                  </div>
                </Card>
                <Card>
                  <div>
                    <label>所患疾病：</label>
                    <span>{{ userInfo.illness }}</span>
                  </div>
                  <div>
                    <label>疾病史：</label>
                    <span>{{ userInfo.jibing }}</span>
                  </div>
                  <div>
                    <label>手术史：</label>
                    <span>{{ userInfo.shoushu }}</span>
                  </div>
                  <div>
                    <label>遗传病史：</label>
                    <span>{{ userInfo.yichuan }}</span>
                  </div>
                  <div>
                    <label>饮酒情况：</label>
                    <span>{{ userInfo.alcoholConsumption }}</span>
                  </div>
                  <div>
                    <label>吸烟情况：</label>
                    <span>{{ userInfo.smokingSituation }}</span>
                  </div>
                  <div>
                    <label>运动情况：</label>
                    <span>{{ userInfo.sportsSituation }}</span>
                  </div>
                  <div>
                    <label>运动方式：</label>
                    <span>{{ userInfo.modeOfMotion }}</span>
                  </div>
                  <div>
                    <label>生活以静坐为主：</label>
                    <span>{{ userInfo.meditationSituation }}</span>
                  </div>
                </Card>
              </div>
            </TabPane>
            <TabPane key="2" tab="就医记录" force-render>
              <Table :dataSource="dsMedicalRecord" :columns="columnsMedicalRecord" />
            </TabPane>
            <TabPane key="3" tab="日常体征">
              <Table :dataSource="dsDailySign" :columns="columnsDailySign" />
            </TabPane>
            <TabPane key="4" tab="体检记录">
              <Table :dataSource="dsPhysicalExamination" :columns="columnsPhysicalExamination" />
            </TabPane>
            <TabPane key="5" tab="养老服务">
              <Table :dataSource="dsOlderCaringService" :columns="columnsOlderCaringService" />
            </TabPane>
            <TabPane key="6" tab="服务推荐">
              <Table
                :dataSource="dsServiceRecommendation"
                :columns="columnsServiceRecommendations"
              />
            </TabPane>
            <TabPane key="7" tab="健康建议">
              <Table :dataSource="dsHealthAdvise" :columns="columnsHealthAdvise" />
            </TabPane>
            <TabPane key="8" tab="健康评估">
              <Table :dataSource="dsHealthEvaluation" :columns="columnsHealthEvaluation" />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <!-- <div CollapseTransition="popup-button-row">
        <button class="popup-cancel-button" @click="() => (isDetailedInfoVisible = false)">Cancel</button>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup name="Analysis">
  import NowInfo from './components/NowInfo.vue';
  import Report from './components/Report.vue';
  import Search from './components/Search.vue';
  import MyReserve from './components/MyReserve.vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import BasicInfo from './components/BasicInfo.vue';
  import HealthEvent from './components/HealthEvent.vue';
  import MedicalInsurance from './components/MedicalInsurance.vue';
  import { ref, onMounted, computed } from 'vue';
  import { getBaseInfo } from '/@/api/sys/desktopApi';
  import { useUserStore } from '/@/store/modules/user';
  import { CollapseTransition } from '/@/components/Transition';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { Card, Divider, Tabs, TabPane, Avatar, Button, Table } from 'ant-design-vue';
  import * as d3 from 'd3';
  import * as cloud from 'd3-cloud';
  const userStore = useUserStore();
  console.log(userStore);
  // 使用 ref 创建一个响应式引用
  const userInfo = ref({});
  // const phone = userStore?.patientPhone ?? '13021646422';
  const phone = (userStore as { patientPhone?: string }).patientPhone ?? '13021646422';
  // const phone = '13021646422';
  onMounted(async () => {
    try {
      // 调用异步函数并等待结果
      const data = await getBaseInfo({
        phone: phone,
      });
      console.log(data);
      // 更新响应式引用
      userInfo.value = data;
      // 处理从 getBaseInfo 返回的数据
      // console.log(data);

      const words = [
        { text: '中年', size: 24 },
        { text: '高血压', size: 24 },
        { text: '高血糖', size: 24 },
        { text: '高血脂', size: 24 },
      ];

      // const layout = d3.layout.cloud()
      const layout = cloud()
        .size([360, 300])
        .words(words)
        .padding(5)
        .rotate(function () {
          // return ~~(Math.random() * 2) * 90;
          return 0;
        })
        .font('Impact')
        .fontSize(function (d) {
          return d.size;
        })
        .on('end', draw);

      layout.start();

      function draw(words) {
        d3.select('#wordcloud')
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', function (d) {
            return d.size + 'px';
          })
          .style('font-family', 'Impact')
          .style('fill', function (d, i) {
            return d3.schemeCategory10[i % 10];
          })
          .attr('text-anchor', 'middle')
          .attr('transform', function (d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
          })
          .text(function (d) {
            return d.text;
          });
      }
    } catch (error) {
      // 处理从 getBaseInfo 抛出的错误
      console.error(error);
    }
  });
  let isDetailedInfoVisible = ref(false);
  const checkDetailedInfo = () => {
    isDetailedInfoVisible.value = true;
  };
  let tabKey = ref('1');
  const bmidata = computed(() => {
    if (userInfo.value && userInfo.value.height && userInfo.value.weight) {
      const heightInMeters = userInfo.value.height / 100; // 将身高从厘米转换为米
      const bmi = userInfo.value.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(2); // 直接返回格式化后的字符串
    }
    return '---'; // 如果缺少必要的数据，则返回占位符
  });

  const dsMedicalRecord = [];
  const dsDailySign = [];
  const dsPhysicalExamination = [];
  const dsOlderCaringService = [];
  const dsServiceRecommendation = [];
  const dsHealthAdvise = [];
  const dsHealthEvaluation = [];

  const columnsMedicalRecord = [
    {
      title: '就诊时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '就诊医院',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '就诊科室',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '诊断疾病',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '就诊类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据来源',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const columnsDailySign = [
    {
      title: '日期',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '测量时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '项目',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '值',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据来源',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const columnsPhysicalExamination = [
    {
      title: '体检日期',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '体检医院',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '体检项目',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '体检照片',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据来源',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const columnsOlderCaringService = [
    {
      title: '日期',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '购买服务',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '购买方式',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '服务提供机构',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '到期时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据来源',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const columnsServiceRecommendations = [
    {
      title: '服务',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '服务商',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '规格',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '服务简介',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '推荐理由',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
  ];
  const columnsHealthAdvise = [
    {
      title: '日期',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图标',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const columnsHealthEvaluation = [
    {
      title: '日期',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图标',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'name',
      key: 'name',
    },
  ];
</script>
<style>
  .popup {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(203, 202, 202, 0.7);
  }

  .popup > * {
    border-radius: 4px;
  }

  .popup-inner {
    position: relative;
    width: 90%;
    height: 90%;
    overflow-y: auto;
    border: 1px solid #006699;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 28px;
    background-color: #ffffff;
    /* display: flex;
      flex-direction: column; */
  }

  .popup-inner > .popup-close-button {
    box-sizing: content-box;
    position: absolute;
    right: 2px;
    top: 2px;
    /* padding-top: 1px; */
    padding-bottom: 1px;
    padding-left: 7px;
    padding-right: 7px;
    border-width: 1px;
    border-style: outset;
    border-color: buttonborder;
    border-image: initial;
    margin: 0;
    opacity: 60%;
    border-radius: 4px;
  }

  .popup-inner > .popup-close-button:hover {
    opacity: 100%;
  }

  .popup-inner > .popup-button-row {
    display: flex;
    justify-content: flex-end;
  }

  .popup-inner > .popup-button-row > .popup-cancel-button {
    margin-left: 2px;
  }

  .module_title {
    color: #009688;
    font-size: 22px;
    .btn {
      font-size: 18px;
      color: #557bfa;
      cursor: pointer;
    }
  }

  .hr-style {
    border-top: 1px solid #4caf50;
  }

  .item_title {
    font-size: 14px;
    margin-top: 15px;
    color: #000000;
  }

  .content-title {
    color: #009688;
    font-size: 18px;
    /* margin-bottom: 5px; */
    margin-top: 5px;
    margin-right: 20px;
  }

  .align-right {
    justify-content: flex-end;
  }

  .tip-style {
    line-height: 0;
    font-size: smaller;
    font-weight: bold;
  }

  /* :deep(.ant-card-head-title){
    background: yellowgreen;
  } */
  .ant-tabs-content-holder {
    height: 100%;
  }

  .ant-tabs-content {
    height: 100%;
  }
</style>

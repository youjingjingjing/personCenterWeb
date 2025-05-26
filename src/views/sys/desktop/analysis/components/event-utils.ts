let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
import { ref } from 'vue';
import { imagesUploadListData } from '/@/api/information/imagesUpload';
// const { t } = useI18n('information.imagesUpload');
const data = await imagesUploadListData();
// console.log('data', data);

export interface TimeEvent {
  id?: string; // 类型
  title?: string; // 其他
  start?: string; // 时间
}

export const eventsList = ref<TimeEvent[]>([]);

data.list.forEach((item) => {
  const newEvent: TimeEvent = {
    id: '',
    title: '',
    start: '',
  };
  newEvent.id = item.id;
  newEvent.start = item.time;
  newEvent.title = item.type;
  // console.log('newEvent', newEvent);
  eventsList.value?.push(newEvent);
  // console.log('eventsList', eventsList.value);
});

// console.log('eventsList.value', eventsList.value);

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
  {
    // this object will be "parsed" into an Event Object
    id: createEventId(),
    title: 'The Title', // a property!
    start: '2024-05-01', // a property!
    end: '2024-05-02', // a property! ** see important note below about 'end' **
  },
  {
    id: '1767810326572630016',
    title: 'event2',
    date: '2024-05-05',
  },
  {
    id: '1767368899685855232',
    title: 'event3',
    start: '2024-05-09T12:30:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}

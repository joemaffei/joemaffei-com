declare module "react-use-calendar" {
  type DayOfTheWeek = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

  type Day = {
    date: Date;
    dayIndex: number;
    dayOfMonth: number;
    dayOfWeek: DayOfTheWeek;
    dayOfYear: number;
    events: Event[];
    isToday: boolean;
    isSameMonth: boolean;
    isWeekend: boolean;
    weekIndex: number;
  };

  type Week = Day[];

  type State = {
    days: DayOfTheWeek[];
    weeks: Week[];
    month: string;
    year: number;
  };

  type Event = {
    startDate: Date;
    endDate: Date;
    note: string;
  };

  type Actions = {
    setDate: (today: Date) => void;
    getNextMonth: () => void;
    getPrevMonth: () => void;
    addEvent: (event: Event) => void;
    removeEvent: (id: number) => void;
  };

  type Config = {
    events?: Event[];
    numOfWeeks?: number;
    numOfDays?: number;
    rtl?: boolean;
    locale?: object; // date-fns locale
  };

  function useCalendar(date: Date, config: Config): [State, Actions] {}

  export = useCalendar;
}

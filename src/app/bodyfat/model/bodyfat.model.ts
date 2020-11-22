import { TimeOfDay } from 'src/app/shared/model/time-of-day.enum';

export interface Bodyfat {
    id: string;
    bodyfat: number;
    measuredOn: Date;
    partOfDayMeasured: TimeOfDay;
}

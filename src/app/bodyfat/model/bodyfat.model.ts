import { TimeOfDay } from '@app-types/time-of-day.enum';

export interface Bodyfat {
    id: string;
    bodyfat: number;
    measuredOn: Date;
    partOfDayMeasured: TimeOfDay;
}

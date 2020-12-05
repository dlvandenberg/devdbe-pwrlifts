import { TimeOfDay } from '@app-types/time-of-day.enum';

export interface Bodyfat {
    id?: string;
    bodyfat: number;
    date: Date;
    time: TimeOfDay;
}

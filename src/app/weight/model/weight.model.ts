import { TimeOfDay } from '@app-types/time-of-day.enum';

export interface Weight {
    id: string;
    weight: number;
    calories: number;
    date: Date;
    time: TimeOfDay;
}

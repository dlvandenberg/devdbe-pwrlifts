import { TimeOfDay } from '../../shared/model/time-of-day.enum';

export interface Weight {
    id: string;
    weight: number;
    calories: number;
    measuredOn: Date;
    partOfDayMeasured: TimeOfDay;
}

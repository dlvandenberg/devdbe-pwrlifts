import { TimeOfDay } from '@app-types/time-of-day.enum';
import { MeasurementType } from './measurement-type.model';

export interface BodyMeasurement {
    id?: string;
    measurementType: MeasurementType,
    measurement: number;
    calories: number;
    date: Date;
    time: TimeOfDay;
}

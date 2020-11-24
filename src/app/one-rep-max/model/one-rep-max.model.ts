import { TimeOfDay } from 'src/app/shared/model/time-of-day.enum';
import { Exercise } from './exercise.enum';

export interface OneRepMax {
    id: string;
    exercise: Exercise;
    weight: number;
    reps: number;
    oneRepMax: number;
    calculated: boolean;
    date: Date;
    time: TimeOfDay;
    rpe: number;
}

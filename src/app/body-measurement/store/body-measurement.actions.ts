import { BodyMeasurement } from '@app-body-measurement/model/bodyfat.model';
import { createAction, props } from '@ngrx/store';
import { TimeOfDay } from '@app-types/time-of-day.enum';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';

export const startEditing = createAction('[BodyMeasurement] Start Editing');

export const startEditingExisting = createAction(
    '[BodyMeasurement] Start Editing Existing',
    props<{
        measurement: BodyMeasurement
    }>()
);

export const cancelEditing = createAction('[BodyMeasurement] Cancel editing');

export const createBodyMeasurement = createAction(
    '[BodyMeasurement] Create',
    props<{
        measurementType: MeasurementType,
        measurement: number,
        calories: number,
        date: Date,
        time: TimeOfDay
    }>()
);

export const updateBodyMeasurement = createAction(
    '[BodyMeasurement] Update',
    props<{
        measurementType: MeasurementType,
        id?: string,
        measurement: number,
        calories: number,
        date: Date,
        time: TimeOfDay
    }>()
);

export const deleteBodyMeasurement = createAction(
    '[BodyMeasurement] Delete',
    props<{
        measurementType: MeasurementType,
        id: string
    }>()
);

export const fetchBodyMeasurements = createAction(
    '[BodyMeasurement] Fetch Measurements',
    props<{ measurementType: MeasurementType }>()
);

export const storeBodyMeasurements = createAction(
    '[BodyMeasurement] Store Measurements',
    props<{
        measurementType: MeasurementType,
        measurements: BodyMeasurement[]
    }>()
);

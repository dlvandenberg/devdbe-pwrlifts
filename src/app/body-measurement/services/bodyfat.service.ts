import { Injectable } from '@angular/core';
import { BodyMeasurement } from '@app-body-measurement/model/bodyfat.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromBodyMeasurement from '@app-body-measurement/store/body-measurements.reducer';
import * as fromBodyMeasurementActions from '@app-body-measurement/store/body-measurement.actions';
import { MeasurementType } from '@app-body-measurement/model/measurement-type.model';

@Injectable({
    providedIn: 'root'
})
export class BodyMeasurementService {
    constructor(private readonly store: Store) { }

    public measurements$(measurementType: MeasurementType): Observable<BodyMeasurement[]> {
        return this.store.select(fromBodyMeasurement.selectState).pipe(
            map(state => state[measurementType.name]),
        );
    }

    get editing$(): Observable<boolean> {
        return this.store.select(fromBodyMeasurement.selectState).pipe(
            map(state => state.editing)
        );
    }

    get editingMeasurement$(): Observable<BodyMeasurement> {
        return this.store.select(fromBodyMeasurement.selectState).pipe(
            map(state => state.editingMeasurement)
        );
    }

    public startEditing(): void {
        this.store.dispatch(fromBodyMeasurementActions.startEditing());
    }

    public startEditingExisting(measurement: BodyMeasurement): void {
        this.store.dispatch(fromBodyMeasurementActions.startEditingExisting({ measurement }));
    }

    public cancelEditing(): void {
        this.store.dispatch(fromBodyMeasurementActions.cancelEditing());
    }

    public create(measurement: BodyMeasurement): void {
        this.store.dispatch(fromBodyMeasurementActions.createBodyMeasurement(measurement));
    }

    public delete(measurementType: MeasurementType, id: string): void {
        this.store.dispatch(fromBodyMeasurementActions.deleteBodyMeasurement({ measurementType, id }));
    }

    public update(measurement: BodyMeasurement): void {
        this.store.dispatch(fromBodyMeasurementActions.updateBodyMeasurement(measurement));
    }

    public fetchBodyMeasurements(measurementType: MeasurementType): void {
        this.store.dispatch(fromBodyMeasurementActions.fetchBodyMeasurements({ measurementType }));
    }
}

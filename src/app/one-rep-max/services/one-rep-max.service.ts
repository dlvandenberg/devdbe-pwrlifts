import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OneRepMax } from '@app-one-rep-max/model/one-rep-max.model';
import * as fromOneRepMax from '@app-one-rep-max/store/one-rep-max.reducer';
import * as fromOneRepMaxActions from '@app-one-rep-max/store/one-rep-max.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '@app-one-rep-max/model/exercise.enum';

@Injectable({
    providedIn: 'root'
})
export class OneRepMaxService {
    constructor(private readonly store: Store) {}

    get editing$(): Observable<boolean> {
        return this.store.select(fromOneRepMax.selectState).pipe(
            map(state => state.editing)
        );
    }

    get editingOneRepMax$(): Observable<OneRepMax> {
        return this.store.select(fromOneRepMax.selectState).pipe(
            map(state => state.editingOneRepMax)
        );
    }

    public oneRepMaxes$(exercise: Exercise): Observable<OneRepMax[]> {
        return this.store.select(fromOneRepMax.selectState).pipe(
            map(state => state[exercise])
        );
    }

    public fetchOneRepMaxes(exercise: Exercise): void {
        this.store.dispatch(fromOneRepMaxActions.fetchOneRepMaxes({ exercise }));
    }

    public create(oneRepMax: OneRepMax): void {
        this.store.dispatch(fromOneRepMaxActions.createOneRepMax({
            ...oneRepMax
        }));
    }

    public update(oneRepMax: OneRepMax): void {
        this.store.dispatch(fromOneRepMaxActions.updateOneRepMax({
            ...oneRepMax
        }));
    }

    public delete(id: string, exercise: Exercise): void {
        this.store.dispatch(fromOneRepMaxActions.deleteOneRepMax({ id, exercise }));
    }

    public startEditing(): void {
        this.store.dispatch(fromOneRepMaxActions.startEditing());
    }

    public startEditingExisting(oneRepMax: OneRepMax): void {
        this.store.dispatch(fromOneRepMaxActions.startEditingExisting({ oneRepMax }));
    }

    public cancelEditing(): void {
        this.store.dispatch(fromOneRepMaxActions.cancelEditing());
    }
}

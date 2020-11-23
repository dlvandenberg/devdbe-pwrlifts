import { Injectable } from '@angular/core';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromBodyfat from '../store/bodyfat.reducer';
import * as fromBodyfatActions from '../store/bodyfat.actions';

@Injectable({
    providedIn: 'root'
})
export class BodyfatService {
    constructor(private readonly store: Store) { }

    get bodyfats$(): Observable<Bodyfat[]> {
        return this.store.select(fromBodyfat.selectState).pipe(
            map(state => state.bodyfats)
        );
    }

    get editing$(): Observable<boolean> {
        return this.store.select(fromBodyfat.selectState).pipe(
            map(state => state.editing)
        );
    }

    get editingBodyfat$(): Observable<Bodyfat> {
        return this.store.select(fromBodyfat.selectState).pipe(
            map(state => state.editingBodyfat)
        );
    }

    public startEditing(): void {
        this.store.dispatch(fromBodyfatActions.startEditing());
    }

    public startEditingExisting(bodyfat: Bodyfat): void {
        this.store.dispatch(fromBodyfatActions.startEditingExisting({ bodyfat }));
    }

    public cancelEditing(): void {
        this.store.dispatch(fromBodyfatActions.cancelEditing());
    }

    public create(bodyfat: Bodyfat): void {
        this.store.dispatch(fromBodyfatActions.createBodyfat(bodyfat));
    }

    public update(bodyfat: Bodyfat): void {
        this.store.dispatch(fromBodyfatActions.updateBodyfat(bodyfat));
    }

    public fetchBodyfats(): void {
        this.store.dispatch(fromBodyfatActions.fetchBodyfats());
    }
}

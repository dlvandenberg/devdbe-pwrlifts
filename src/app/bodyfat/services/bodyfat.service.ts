import { Injectable } from '@angular/core';
import { Bodyfat } from '@app-bodyfat/model/bodyfat.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBodyfat from '../store/bodyfat.reducer';
import * as fromBodyfatActions from '../store/bodyfat.actions';
import { map } from 'rxjs/operators';

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

    public startEditing(): void {
        this.store.dispatch(fromBodyfatActions.startEditing());
    }

    public cancelEditing(): void {
        this.store.dispatch(fromBodyfatActions.cancelEditing());
    }

    public create(bodyfat: Bodyfat): void {
        this.store.dispatch(fromBodyfatActions.createBodyfat(bodyfat));
    }

    public fetchBodyfats(): void {
        this.store.dispatch(fromBodyfatActions.fetchBodyfats());
    }
}

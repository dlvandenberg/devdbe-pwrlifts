import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weight } from '../model/weight.model';
import * as fromWeightActions from '../store/weight.actions';
import * as fromWeight from '../store/weight.reducer';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private readonly store: Store) { }

  get weights$(): Observable<Weight[]> {
    return this.store.select(fromWeight.selectState).pipe(
      map(state => state.weights)
    );
  }

  get editing$(): Observable<boolean> {
    return this.store.select(fromWeight.selectState).pipe(
      map(state => state.editing)
    );
  }

  get editingWeight$(): Observable<Weight> {
    return this.store.select(fromWeight.selectState).pipe(
      map(state => state.editingWeight)
    );
  }

  public create(weight: Weight): void {
    this.store.dispatch(fromWeightActions.createWeight(weight));
  }

  public update(weight: Weight): void {
    this.store.dispatch(fromWeightActions.updateWeight(weight));
  }

  public startEditing(): void {
    this.store.dispatch(fromWeightActions.startEditing());
  }

  public startEditingExisting(weight: Weight): void {
    this.store.dispatch(fromWeightActions.startEditingExisting(weight));
  }

  public cancelEditing(): void {
    this.store.dispatch(fromWeightActions.cancelEditing());
  }

  public fetchWeights(): void {
    this.store.dispatch(fromWeightActions.fetchWeights());
  }
}

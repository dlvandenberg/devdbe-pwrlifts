import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DestroyObservable extends Observable<void> implements OnDestroy {
    private readonly life$ = new Subject<void>();

    constructor() {
        super(subscriber => this.life$.subscribe(subscriber));
    }

    public ngOnDestroy(): void {
        this.life$.next();
        this.life$.complete();
    }
}

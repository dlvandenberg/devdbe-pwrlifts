import { interval, observable } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { DestroyObservable } from './destroy.observable';

describe('DestroyObservable', () => {
    let obs: DestroyObservable;

    beforeEach(() => {
      obs = new DestroyObservable();
    });

    it('should create an instance', () => {
      expect(obs).toBeTruthy();
    });

    it('should complete itself when ngOnDestroy hook is called', async () => {
        let destroyed = false;
        obs.subscribe(() => {}, () => {}, () => destroyed = true);

        obs.ngOnDestroy();

        expect(destroyed).toBeTruthy();
    });

    it('should complete a subscription when ngOnDestroy hook is called', async () => {
        let destroyed = false;

        interval(1000).pipe(takeUntil(obs)).subscribe(() => {}, () => {}, () => destroyed = true);

        obs.ngOnDestroy();

        expect(destroyed).toBeTruthy();
    });
  });

import { Gender } from '@app-types/gender.enum';
import { createAction, props } from '@ngrx/store';

export const createUser = createAction(
    '[User] Create User',
    props<{
        id: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        email: string,
        gender: Gender
    }> ()
);

export const storeUser = createAction(
    '[User] Store User',
    props<{
        id: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        email: string,
        gender: Gender
    }> ()
);

export const fetchUser = createAction(
    '[User] Fetch User',
    props<{ id: string }>()
);

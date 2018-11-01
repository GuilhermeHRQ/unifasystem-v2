import {animate, style, transition, trigger} from '@angular/animations';

export const enterLeaveViewAnimation = trigger(
    'enterLeaveViewAnimation',
    [
        transition(
            ':enter', [
                style({
                    height: '0',
                    transform: 'scale(0.8) translateY(-16px)',
                    opacity: 0
                }),
                animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    height: '*',
                    transform: 'scale(1) translateY(0)',
                    opacity: 1
                }))
            ]
        ),
        transition(
            ':leave', [
                style({
                    height: '*',
                    transform: 'scale(1) translateY(0)',
                    opacity: 1
                }),
                animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    height: '0',
                    transform: 'scale(0.8) translateY(-16px)',
                    opacity: 0
                }))
            ]
        )]
);

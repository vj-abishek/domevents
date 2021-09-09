import { writable } from 'svelte/store';

export const target = writable({
    target: 'first grandchild',
    bubble: true,
    events: [],
});

export const currentEventTarget = writable({
    target: null,
    events: []
})
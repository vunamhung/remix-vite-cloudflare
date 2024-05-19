import { proxy } from 'valtio';

export const globalState = proxy({ count: 0, text: 'hello' });

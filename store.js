import { observable } from 'mobx';

class globalStore {
    @observable todos = ['buy milk'];
    @observable filter = '';
}

let store = new globalStore;

export default store;
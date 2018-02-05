import { observable } from 'mobx';

class globalStore {
    @observable todos = ['buy abc'];
    @observable filter = '';
}

let store = new globalStore;

export default store;
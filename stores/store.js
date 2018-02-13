import { observable, action, mobx } from 'mobx';

class globalStore {
    @observable backFunction = null; // back function for back button on navigation
    @observable globalStep = 1; // step for current step multi step form
    // notification list to display
    @observable notification = observable.shallowArray();

    // go to next step in multi-step component
    @action nextStep = () => {
        this.globalStep++;
    }

    // go to previous step in multi-step component
    @action previousSTep = () => {
        this.globalStep--;
    }

    // set callback function
    @action setBackFunction = (fnc) => {
        this.backFunction = fnc;
    }

    // add notification
    @action addNotification = (object) => {
        // add notification when its not existed before in array
        if (this.notification.indexOf(object) == -1) {
            this.notification.push(object);
        }
    }

    // remove selected notification
    @action removeNotification = (index) => {
        this.notification.splice(index, 1);
    }

}

let store = new globalStore;

export default store;
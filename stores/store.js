import { observable, action, mobx } from 'mobx';

class globalStore {
    @observable backFunction = null; // back function for back button on navigation
    @observable globalStep = 1; // step for current step multi step form
    @observable globalMaps = null;
    @observable showMap = false; // check variables to show/hide google maps
    @observable lat = 13.7764671; // lat of current user
    @observable lng = 109.2260315; // lng of current user
    @observable address = '199 Phan Bội Châu, Trần Hưng Đạo, Thành phố Qui Nhơn, Bình Định'; // current address of user
    @observable notification = observable.shallowArray(); // notification list to display

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
        if (this.notification.length > 0) {
            if (this.notification[0].content.toString() !== object.content.toString()) {
                this.notification.push(object);
            }
        } else {
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
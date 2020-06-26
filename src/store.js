import { observable, decorate } from "mobx";

class MainStore {
    users = []

    me = {}

    token = ""

    pageNum = 0
}
decorate(MainStore, {
    users: observable,
    me: observable,
    token: observable,
    pageNum : observable
})

const store = new MainStore();
export default store;
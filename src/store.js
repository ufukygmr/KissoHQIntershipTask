import { observable, decorate } from "mobx";

class MainStore {
    users = []

    me = {
        firstname: "Ufuk",
        lastname: "Yağmur",
        email: "uyagmur123@gmail.com",
        job: "Developer",
        password: "$2a$10$sIh1KllqDA3o4vQNOnx8nOz6QcCtYkqkHCrG1.KQPFbCbymrPRgvG",
    }

    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVmNWI0NmJjYWVkOTdiN2NhZTE1MGY1In0sImlhdCI6MTU5MzE2Nzc2MSwiZXhwIjoxNTkzMTcxMzYxfQ.itSHLZQY0qZbBKI1KDa6_AAZKeKM9FPCezI6A_QD6NI"

    url = "http://localhost:3000/user/"

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
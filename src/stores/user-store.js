import { makeAutoObservable } from "mobx";

export const userStore = makeAutoObservable({
  user: null,

  login(user) {
    this.user = user;
  },

  logout() {
    this.user = null;
  },

  get userUid() {
    return this.user?.uid;
  },

  get userEmail() {
    return this.user?.email;
  },
});

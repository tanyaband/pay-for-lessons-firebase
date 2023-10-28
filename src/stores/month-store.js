import { makeAutoObservable } from "mobx";
import { computedFn } from "mobx-utils";

export const monthStore = makeAutoObservable({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),

  nextMonth() {
    if (this.month == 11) {
      this.year++;
      this.month = 0;
    } else {
      this.month++;
    }
  },

  prevMonth() {
    if (this.month == 0) {
      this.year--;
      this.month = 11;
    } else {
      this.month--;
    }
  },

  get firstDay() {
    return (new Date(this.year, this.month).getDay() + 6) % 7;
  },

  get lastDate() {
    return new Date(this.year, this.month + 1, 0).getDate();
  },

  get weeksNumber() {
    return Math.ceil((this.lastDate + this.firstDay) / 7);
  },

  getDate: computedFn(function (weekIndex, dayIndex) {
    const day = weekIndex * 7 + dayIndex - this.firstDay + 1;
    if (day < 1 || day > this.lastDate) return undefined;
    return day;
  }),
});

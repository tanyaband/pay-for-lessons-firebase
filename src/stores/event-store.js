import { makeAutoObservable, toJS, autorun } from "mobx";
import { monthStore } from "./month-store";

export const eventStore = makeAutoObservable({
  items: JSON.parse(localStorage.getItem("pfl_events")) || [],

  get monthEvents() {
    return this.items
      .filter(
        (item) =>
          item.year === monthStore.year && item.month === monthStore.month
      )
      .reduce((acc, item) => {
        const event = { studentId: item.studentId, type: item.type };
        if (acc[item.day]) acc[item.day].push(event);
        else acc[item.day] = [event];
        return acc;
      }, {});
  },

  hasEvents(studentId) {
    return !!this.items.find((item) => item.studentId === studentId);
  },

  updateEvents(newEvents, day) {
    this.items = this.items.filter(
      (item) =>
        item.year !== monthStore.year ||
        item.month !== monthStore.month ||
        item.day !== day ||
        newEvents.find(
          (event) =>
            event.studentId === item.studentId && event.type === item.type
        )
    );
    newEvents.forEach((element) => {
      if (
        !this.monthEvents[day]?.find(
          (item) =>
            item.studentId === element.studentId && item.type === element.type
        )
      ) {
        this.items.push({
          year: monthStore.year,
          month: monthStore.month,
          day: day,
          studentId: element.studentId,
          type: element.type,
        });
      }
    });
  },

  deleteStudentEvents(studentId) {
    this.items = this.items.filter((item) => item.studentId != studentId);
  },
});

autorun(() => {
  localStorage.setItem("pfl_events", JSON.stringify(toJS(eventStore.items)));
});

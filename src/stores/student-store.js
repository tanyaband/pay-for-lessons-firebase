import { makeAutoObservable, autorun, toJS } from "mobx";
import { eventStore } from "./event-store";

export const studentStore = makeAutoObservable({
  items: {},
  ids: [],

  setStudents(students) {
    this.items = students;
    this.ids = Object.keys(students);
  },

  get studentIds() {
    return this.ids;
  },

  getStudentById(studentId) {
    return this.items[studentId];
  },

  addStudent(studentId, student) {
    this.items[studentId] = student;
    this.ids.push(studentId);
  },

  deleteStudent(studentId) {
    if (eventStore.hasEvents(studentId)) {
      const result = confirm(
        "Все события ученика будут удалены. Подтвердить удаление?"
      );
      if (!result) {
        return;
      }
      eventStore.deleteStudentEvents(studentId);
    }
    delete this.items[studentId];
    this.ids.splice(this.ids.indexOf(studentId), 1);
  },

  editStudent(studentId, student) {
    this.items[studentId] = student;
  },
});

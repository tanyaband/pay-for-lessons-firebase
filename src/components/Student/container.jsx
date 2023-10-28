import { Student } from "./component";
import { StudentForm } from "../StudentForm/component";
import { createPortal } from "react-dom";
import { useState } from "react";
import { observer } from "mobx-react";
import { studentStore } from "../../stores/student-store";
import { database } from "../../stores/database";

export const StudentContainer = observer(({ studentId }) => {
  const [showModal, setShowModal] = useState();
  const student = studentStore.getStudentById(studentId);

  return (
    <>
      <Student
        student={student}
        onDelete={() => database.deleteStudent(studentId)}
        onEdit={() => setShowModal(true)}
      ></Student>
      {showModal &&
        createPortal(
          <StudentForm
            title="Редактирование пользователя"
            student={student}
            onCancel={() => setShowModal(false)}
            onOk={(newStudent) => {
              database.editStudent(studentId, newStudent);
              setShowModal(false);
            }}
          />,
          document.getElementById("modal-container")
        )}
    </>
  );
});

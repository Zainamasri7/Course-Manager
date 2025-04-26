const form = document.getElementById("course-form");
const tableBody = document.getElementById("course-table");
const search = document.getElementById("search");
const deleteAllBtn = document.getElementById("delete-all");

let courses = JSON.parse(localStorage.getItem("courses")) || [];

function saveAndRender() {
  localStorage.setItem("courses", JSON.stringify(courses));
  renderCourses();
}

function renderCourses(filter = "") {
  tableBody.innerHTML = "";
  courses
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((course, i) => {
      tableBody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${course.name}</td>
          <td>${course.category}</td>
          <td>$${course.price}</td>
          <td>${course.capacity}</td>
          <td>
            <button onclick="deleteCourse(${i})">🗑</button>
          </td>
        </tr>`;
    });
}

function deleteCourse(index) {
  courses.splice(index, 1);
  saveAndRender();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const course = {
    name: form.name.value,
    category: form.category.value,
    price: form.price.value,
    description: form.description.value,
    capacity: form.capacity.value,
  };
  courses.push(course);
  form.reset();
  saveAndRender();

  // ✅ SweetAlert2 رسالة تأكيد
  Swal.fire({
    title: "تم الإضافة!",
    text: "تم إضافة الدورة بنجاح.",
    icon: "success",
    confirmButtonText: "رائع"
  });
});

search.addEventListener("input", e => {
  renderCourses(e.target.value);
});

deleteAllBtn.addEventListener("click", () => {
  if (courses.length > 0) {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف جميع الدورات!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!"
    }).then((result) => {
      if (result.isConfirmed) {
        courses = [];
        saveAndRender();
        Swal.fire("تم الحذف!", "تم حذف جميع الدورات.", "success");
      }
    });
  }
});

renderCourses();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const userList = document.getElementById("userList");
  const editModal = document.getElementById("editModal");
  const editNameInput = document.getElementById("editName");
  const editEmailInput = document.getElementById("editEmail");

  let editingUser = null;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Agregar usuario a la tabla
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>
                <button onclick="editUser(this)">Editar</button>
                <button onclick="deleteUser(this)">Borrar</button>
            </td>
        `;
    userList.appendChild(row);

    // Para limpiar campos del formulario
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  });

  // Función para editar usuario
  function editUser(button) {
    const row = button.closest("tr"); // Obtener la fila actual
    const nameCell = row.querySelector("td:first-child");
    const emailCell = row.querySelector("td:nth-child(2)");

    // Guardar datos del usuario actual
    editingUser = {
      row,
      name: nameCell.textContent,
      email: emailCell.textContent,
    };

    // Mostrando el modal de edición
    editNameInput.value = editingUser.name;
    editEmailInput.value = editingUser.email;
    editModal.style.display = "block";
  }

  // Función para guardar los cambios
  function salvarCambios() {
    if (editingUser) {
      const newName = editNameInput.value;
      const newEmail = editEmailInput.value;

      // Actualizar datos en la fila
      editingUser.row.querySelector("td:first-child").textContent = newName;
      editingUser.row.querySelector("td:nth-child(2)").textContent = newEmail;

      // Cerrar el modal
      closeModal();
    }
  }

  // Función para borrar el usuario
  function deleteUser(button) {
    // Obtener la fila del usuario a eliminar
    const row = button.closest("tr"); 

    // Eliminar la fila de la tabla HTML
    row.remove(); 

    //  Obteniendo  el ID del usuario 
    const userId = row.querySelector("td:first-child").textContent; 

    // Enviar una solicitud al servidor para eliminar el registro 
    // aca les dejo para  eliminar el registro de la  base de datos, aquí se enviaría la solicitud HTTP.
    // Por si quieren usar Axios:
    axios
      .delete(`/api/users/${userId}`)
      .then((response) => {
        console.log(`Usuario ${userId} eliminado exitosamente del servidor`);
      })
      .catch((error) => {
        console.error(`Error al eliminar usuario ${userId}: ${error}`);
      });

    //  Mostrando mensaje de confirmación
    console.log(`Usuario ${userId} eliminado de la tabla`);
  }

  // Función para cerrar el modal
  function closeModal() {
    editModal.style.display = "none";
    editingUser = null;
  }
});

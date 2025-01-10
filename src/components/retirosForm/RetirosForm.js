import { useEffect, useState } from "react";

function Formulario() {
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");

  // Obtener los datos de empleados y productos al cargar el formulario
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("/api/trabajadores");
        const text = await response.text();
        console.log("Respuesta de la API empleados:", text);

        try {
          const data = JSON.parse(text);
          setEmpleados(data);
        } catch (jsonError) {
          console.error(
            "Error al parsear la respuesta JSON empleados:",
            jsonError
          );
        }
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await fetch("/api/products");
        const text = await response.text();
        console.log("Respuesta de la API productos:", text);

        try {
          const data = JSON.parse(text);
          setProductos(data);
        } catch (jsonError) {
          console.error(
            "Error al parsear la respuesta JSON productos:",
            jsonError
          );
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchEmpleados();
    fetchProductos();
  }, []);

  // Obtener la fecha actual en formato 'yyyy-mm-dd'
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFecha(currentDate);
  }, []);

  // Manejo del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que los campos estén llenos
    if (!empleadoSeleccionado || !productoSeleccionado || !cantidad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Verificar que los valores de empleado y producto sean números
    const empleadoId = Number(empleadoSeleccionado);
    const productoId = Number(productoSeleccionado);
    const cantidadValor = Number(cantidad);

    // Verificar si los valores son válidos
    if (isNaN(empleadoId) || isNaN(productoId) || isNaN(cantidadValor)) {
      alert("Los valores deben ser números válidos.");
      return;
    }

    // Verificar que la cantidad sea mayor a cero
    if (cantidadValor <= 0) {
      alert("La cantidad debe ser mayor a cero.");
      return;
    }

    console.log("Datos enviados:", {
      empleadoId,
      productoId,
      cantidadValor,
      fecha,
    });

    const data = {
      id_material: productoId,
      id_empleado: empleadoId,
      cantidad: cantidadValor,
    };

    try {
      const response = await fetch("/api/retiros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const result = await response.json();
        alert("Retiro registrado con éxito");
        console.log("Resultado de la respuesta:", result); // Mostrar el contenido completo de la respuesta
      } else {
        const result = await response.json();
        console.error("Error en la respuesta:", result);
        alert(
          "Error al registrar el retiro: " + result.message ||
            "Error desconocido"
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al registrar el retiro: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Empleado:
          <select
            name="empleado"
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccionar Empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.nombre} {empleado.apellido_paterno}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Producto:
          <select
            name="producto"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
            required
            disabled={productos.length === 0}
          >
            <option value="">Seleccionar Producto</option>
            {productos.length > 0 &&
              productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            min="1"
          />
        </label>
      </div>

      <div>
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            disabled
          />
        </label>
      </div>

      <button type="submit">Registrar Retiro</button>
    </form>
  );
}

export default Formulario;

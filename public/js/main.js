const API_URL = 'http://localhost:3000';

async function cargarReparaciones(endpoint = '/reparaciones') {
  const res = await fetch(`${API_URL}${endpoint}`);
  const data = await res.json();
  renderizarTabla(data);
}

function renderizarTabla(lista) {
  const tabla = document.getElementById('tablaReparaciones');
  tabla.innerHTML = '';
  lista.forEach(rep => {
    tabla.innerHTML += `
      <tr>
        <td>${rep.IdArticulo}</td>
        <td>${new Date(rep.fechaReparacion).toLocaleDateString()}</td>
        <td>${rep.nombreCliente}</td>
        <td>${rep.tipoEquipo}</td>
        <td>${rep.descripcionProblema}</td>
        <td>${rep.estado}</td>
        <td>${rep.costoEstimado ?? '-'}</td>
        <td>${rep.Pagado ? 'Sí' : 'No'}</td>
      </tr>`;
  });
}

document.getElementById('btnBuscar').addEventListener('click', () => {
  const nombre = document.getElementById('inputCliente').value.trim();
  if (nombre) {
    cargarReparaciones(`/reparaciones/${nombre}`);
  }
});

document.getElementById('btnReset').addEventListener('click', () => {
  document.getElementById('inputCliente').value = '';
  cargarReparaciones();
});

// Cargar todos al inicio
cargarReparaciones();

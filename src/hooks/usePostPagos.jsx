// export const handleConfirmarPago = async () => {
//     if (!formularioCompleto) return;

//     const confirmar = window.confirm('¿Deseás confirmar el pago?');
//     if (!confirmar) return;

//     setLoading(true);

//     try {
//       const payload = {
//         token,
//         titular,
//         numero,
//         mes,
//         anio,
//         cvc,
//       };

//       const res = await api.post('/pagos', payload);
//       console.log('Pago confirmado:', res.data);

//       alert('¡Pago realizado con éxito!');
//       setTitular('');
//       setNumero('');
//       setMes('');
//       setAnio('');
//       setCvc('');
//     } catch (err) {
//       console.error('Error al procesar el pago:', err.response?.data || err.message);
//       alert('Error al procesar el pago. Intenta nuevamente.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
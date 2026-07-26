"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { CartItem } from "@/types";

export default function FacturaPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const cartKey = `cart_${parsedUser.email}`;
    const storedCart = localStorage.getItem(cartKey);

    if (storedCart) {
      const items: CartItem[] = JSON.parse(storedCart);
      setCartItems(items);

      const calculatedTotal = items.reduce(
        (acc, item) => acc + item.game.price * item.quantity,
        0,
      );
      setTotal(calculatedTotal);
    }
  }, [router]);

  const generatePDFAndCheckout = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.text("E-Commerce Leo - Factura de Compra", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableColumn = ["Juego", "Cantidad", "Precio Unitario", "Subtotal"];
    const tableRows = cartItems.map((item) => [
      item.game.title,
      item.quantity,
      `$${item.game.price.toFixed(2)}`,
      `$${(item.game.price * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: "grid",
      headStyles: { fillColor: [79, 70, 229] },
    });

    // @ts-ignore
    const finalY = (doc as any).lastAutoTable?.finalY || 40;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Pagado: $${total.toFixed(2)}`, 14, finalY + 15);

    doc.save("factura-ecommerce-leo.pdf");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const cartKey = `cart_${parsedUser.email}`;

      const cartDetailsText = cartItems
        .map(
          (item) =>
            `- ${item.game.title} (x${item.quantity}) - $${(item.game.price * item.quantity).toFixed(2)}`,
        )
        .join("\n");

      const templateParams = {
        to_name: parsedUser.email.split("@")[0],
        to_email: parsedUser.email,
        cart_details: cartDetailsText,
        total_amount: total.toFixed(2),
      };

      emailjs
        .send(
          "service_e5rn8hj",
          "template_b6qnk48",
          templateParams,
          "gmGNl9z55SDcEvLYA",
        )
        .then(() => {
          Swal.fire({
            title: "¡Compra exitosa!",
            text: "Tu factura se ha descargado y el correo de confirmación ha sido enviado.",
            icon: "success",
            confirmButtonColor: "#4f46e5",
          });
        })
        .catch((error) => {
          console.error("Error al enviar el correo:", error);
          Swal.fire({
            title: "¡Factura descargada!",
            text: "Tu PDF se descargó, pero hubo un detalle al enviar el correo.",
            icon: "warning",
            confirmButtonColor: "#4f46e5",
          });
        });

      localStorage.removeItem(cartKey);
    }
    window.dispatchEvent(new Event("cartUpdated"));
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-indigo-400">
          Resumen de Factura
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 mb-4">
              No hay productos pendientes o la compra ya fue procesada.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-bold transition-colors"
            >
              Volver al Catálogo
            </button>
          </div>
        ) : (
          <>
            <table className="w-full mb-6 border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-sm">
                  <th className="py-2">Juego</th>
                  <th className="py-2 text-center">Cant.</th>
                  <th className="py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {cartItems.map((item) => (
                  <tr key={item.game.id}>
                    <td className="py-3 font-medium">{item.game.title}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right text-indigo-400">
                      ${(item.game.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center text-xl font-bold mb-6 border-t border-gray-700 pt-4">
              <span>Total a Pagar:</span>
              <span className="text-indigo-400">${total.toFixed(2)}</span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={generatePDFAndCheckout}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-bold transition-colors text-center"
              >
                Confirmar y Descargar PDF
              </button>
              <button
                onClick={() => router.push("/")}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

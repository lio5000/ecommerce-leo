"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartItem } from "@/types";
import Swal from "sweetalert2";

export default function Navbar() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserEmail(parsed.email);
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCartStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQuantity = (gameId: number) => {
    const updated = cart.map((item) =>
      item.game.id === gameId ? { ...item, quantity: item.quantity + 1 } : item,
    );
    updateCartStorage(updated);
  };

  const decreaseQuantity = (gameId: number) => {
    const target = cart.find((item) => item.game.id === gameId);
    if (!target) return;

    if (target.quantity === 1) {
      removeItem(gameId);
    } else {
      const updated = cart.map((item) =>
        item.game.id === gameId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      updateCartStorage(updated);
    }
  };

  const removeItem = (gameId: number) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      text: "El juego será removido de tu carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1f2937",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = cart.filter((item) => item.game.id !== gameId);
        updateCartStorage(updated);
        Swal.fire({
          title: "¡Eliminado!",
          text: "El juego ha sido removido.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#ffffff",
        });
      }
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.game.price * item.quantity,
    0,
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserEmail(null);
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center text-white sticky top-0 z-40">
        <Link href="/" className="text-xl font-extrabold text-indigo-400">
          E-Commerce Leo
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Catalogo
          </Link>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {userEmail ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300 hidden sm:inline">
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1.5 text-sm rounded transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="space-x-3">
              <Link
                href="/login"
                className="text-indigo-400 hover:underline text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 text-sm rounded transition-colors"
              >
                Registro
              </Link>
            </div>
          )}
        </div>
      </nav>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-gray-800 text-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-bold">Tu Carrito de Compras</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:text-white text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-400 mt-10">
                    Tu carrito está vacío.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.game.id}
                      className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.game.image}
                            alt={item.game.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold">
                            {item.game.title}
                          </h4>
                          <span className="text-xs text-indigo-400 font-semibold">
                            ${item.game.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-gray-800 rounded border border-gray-600">
                          <button
                            onClick={() => decreaseQuantity(item.game.id)}
                            className="px-2 py-1 text-sm hover:bg-gray-700 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-2 text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.game.id)}
                            className="px-2 py-1 text-sm hover:bg-gray-700 rounded-r"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.game.id)}
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1 border border-red-500 rounded transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-700 p-6 space-y-4 bg-gray-800">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-indigo-400">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      Swal.fire({
                        title: "Próximo paso",
                        text: "Aquí pasaremos a generar la factura y PDF.",
                        icon: "info",
                        background: "#1f2937",
                        color: "#ffffff",
                        confirmButtonColor: "#4f46e5",
                      });
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors text-center block"
                  >
                    Terminar Compra
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from "react";

export default function Footer() {
    return (
        <footer className="py-6 px-6 text-center text-gray-600 text-sm">
            <div className="max-w-6xl mx-auto">
                <p>© {new Date().getFullYear()} Moamba Manager — Todos os direitos reservados.</p>
                <div className="mt-2 flex justify-center space-x-4">
                    <a href="https://github.com/aubaro01/MoambaManager" className="pi pi-github text-blue-600 text-xl" aria-label="GitHub"></a>
                </div>
            </div>
        </footer>
    );
}

// components/Sidebar.js
"use client";

import Image from "next/image";

const Logo = () => {

    return (
        <aside
            className={`text-white h-screen fixed top-7 left-3 translate-x-0 md:translate-x-0 w-64`}
        >
            <div className="flex items-start justify-start p-4">
                <div className="text-xl font-bold">
                    <Image src="/logo.png" alt="Logo" width={200} height={50} />
                </div>
            </div>

        </aside>
    );
};

export default Logo;

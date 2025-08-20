// components/Sidebar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "../context/SideBarContext";
import api from "../utils/api";
import apiRoutes from "../utils/apiRoutes";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation";

async function logout() {
  const res = await api.post(apiRoutes.logout);
  if (res.status !== 200) {
    alert("Failed to logout");
  }
}

const Sidebar = () => {

  const { name, filter, setFilter } = useSidebar();
  const router = useRouter();

  return (
    <aside
      className={`bg-[var(--side-bar-background)] text-white h-screen fixed top-0 left-0 shadow-md transition-transform transform translate-x-0 md:translate-x-0 w-64 flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-start justify-start p-4">
          <div className="text-xl font-bold">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={120} height={50} />
            </Link>
          </div>
        </div>

        <div className="flex items-start justify-start p-4">
          <div className="text-2xl font-bold">
            <span className="not-selected">{name}</span>
          </div>
        </div>
        <nav className="flex flex-col space-y-7 p-4 items-start">
          <button value={filter} onClick={() => setFilter("all")} className={`${filter === "all" ? "selected border-selected" : "not-selected border-not-selected"} w-full text-left text-2xl px-2 py-2 border-b-2`}>
            All Tasks
          </button>
          <button value={filter} onClick={() => setFilter("important")} className={`${filter === "important" ? "selected border-selected" : "not-selected border-not-selected"} w-full text-left text-2xl px-2 py-2 border-b-2`}>
            Important
          </button>
          <button value={filter} onClick={() => setFilter("work")} className={`${filter === "work" ? "selected border-selected" : "not-selected border-not-selected"} w-full text-left text-2xl px-2 py-2 border-b-2`}>
            Work
          </button>
          <button
            value={filter}
            onClick={() => setFilter("personal")}
            className={`w-full text-left text-2xl px-2 py-2 border-b-2 ${filter === "personal"
              ? "selected border-selected"
              : "not-selected border-not-selected"
              }`}
          >
            Personal
          </button>
        </nav>
      </div>

      <div className="flex flex-row justify-between pb-8 px-5">
        <div>
          <button
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="not-selected text-3xl"
          >
            Logout
          </button>
        </div>
        <button
          onClick={async () => {
            await logout();
            router.push("/login");
          }}
          className="not-selected text-3xl"
        >
          <LogoutIcon fontSize="inherit" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

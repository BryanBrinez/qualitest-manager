"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { usePathname} from "next/navigation";

export default function SideBar() {
  const { data } = useSession();
  const pathname = usePathname()

  const [isMenu1Visible, setIsMenu1Visible] = useState(false);

  const toggleMenu1 = () => {
    setIsMenu1Visible(!isMenu1Visible);
  };

  return (
    <>
     
      <div
        id="Main"
        className="xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col"
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
              fill="white"
            />
          </svg>
          <p className="text-2xl leading-6 text-white">Qualiti</p>
        </div>

        <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
          <Link
            href={"/dashboard/proyectos"}
            onClick={() => toggleMenu1()}
            className={`focus:outline-none text-left  text-white flex justify-between items-center w-full py-5 space-x-14 ${
                pathname === "/dashboard/proyectos" ? "text-indigo-400" : "active"
              }`}
          >
            <p className="text-sm leading-5  uppercase">Proyectos</p>
          </Link>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
          <Link
            href={"/dashboard/pruebas"}
            
            className={`focus:outline-none text-left  text-white flex justify-between items-center w-full py-5 space-x-14 ${
                pathname === "/dashboard/pruebas" ? "text-indigo-400" : "active"
              }`}
          >
            <p className="text-sm leading-5 uppercase">Pruebas</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between items-center h-full pb-6   px-6  w-full  space-y-32 ">
          <Link
            href={"/dashboard/errores"}
            
            className={`focus:outline-none text-left  text-white flex justify-between items-center w-full py-5 space-x-14 ${
                pathname === "/dashboard/errores" ? "text-indigo-400" : "active"
              }`}
          >
            <p className="text-sm leading-5  uppercase">Errores</p>
          </Link>

          <div className=" flex justify-between items-center w-full">
            <div className="flex justify-center items-center  space-x-2">
              <div>
                <img
                  className="rounded-full"
                  src="https://i.ibb.co/L1LQtBm/Ellipse-1.png"
                  alt="avatar"
                />
              </div>
              <div className="flex justify-start flex-col items-start">
                <p className="cursor-pointer text-sm leading-5 text-white">
                  {data?.user?.fullname}
                </p>
                <p className="cursor-pointer text-xs leading-3 text-gray-300">
                  {data?.user?.email}
                </p>
              </div>
            </div>
            <button
              className={
                "flex items-center text-red-500 font-light  hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
              }
              onClick={signOut}
            >
              <span className="text-xl">
                <HiOutlineLogout />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

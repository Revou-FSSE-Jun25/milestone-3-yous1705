import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-300 via-indigo-300 to-purple-300 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-16 text-center">
        Pilih Jenis Login
      </h1>

      <div className="flex flex-col sm:flex-row gap-10">
        {/* Card User */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-2xl p-8 w-80 text-center transition-all duration-300 hover:-translate-y-1">
          <Image
            src="https://img.icons8.com/ios-filled/100/2979FF/user-male-circle.png"
            alt="User Icon"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Login sebagai User
          </h2>
          <p className="text-slate-600 mb-6">
            Masuk sebagai pengguna umum untuk mengakses fitur aplikasi.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Masuk
          </Link>
        </div>

        {/* Card Admin */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-2xl p-8 w-80 text-center transition-all duration-300 hover:-translate-y-1">
          <Image
            src="https://img.icons8.com/ios-filled/100/2979FF/admin-settings-male.png"
            alt="Admin Icon"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Login sebagai Admin
          </h2>
          <p className="text-slate-600 mb-6">
            Masuk sebagai administrator untuk mengelola data dan sistem.
          </p>
          <Link
            href="/admin/login"
            className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Masuk
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-25rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 via-indigo-300 to-purple-300 opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
        />
      </div>
    </div>
  );
}

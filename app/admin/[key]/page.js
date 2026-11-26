import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Rekap RSVP — Naila & Alfin",
  robots: { index: false, follow: false, nocache: true },
};

/* Halaman admin: /admin/<kata-sandi>
   Kata sandi dicek di dalam database (fungsi admin_rsvp), bukan di browser.
   Halaman ini tidak diindeks mesin pencari. */
export default async function AdminPage({ params }) {
  const { key } = await params;
  return <AdminDashboard password={decodeURIComponent(key || "")} />;
}

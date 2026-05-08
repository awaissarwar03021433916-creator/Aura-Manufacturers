export default function AdminMessagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Contact Messages</h1>
      <p className="text-neutral-600 mb-8">Submissions from the public contact form.</p>
      <div className="bg-white rounded-2xl border border-neutral-200 p-10 text-center text-neutral-500">
        Message inbox UI — wire to <code>/api/contact</code> once the .NET backend is running.
      </div>
    </div>
  );
}
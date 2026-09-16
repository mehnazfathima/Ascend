import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getAdminUsers } from "@/lib/queries/admin";
import { UserDisableToggle } from "@/components/admin/user-disable-toggle";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Admin · Users" };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const [users, session] = await Promise.all([getAdminUsers(q || undefined), auth()]);

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold">Users</h1>
        <p className="mt-1 text-muted-foreground">{users.length} total</p>
      </div>

      <form method="get" className="mb-6 max-w-sm">
        <Input name="q" placeholder="Search by name or email…" defaultValue={q} />
      </form>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">XP</th>
              <th className="px-4 py-3 font-medium">Completed</th>
              <th className="px-4 py-3 font-medium">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{user.stats?.xp ?? 0}</td>
                <td className="px-4 py-3">{user._count.progress}</td>
                <td className="px-4 py-3">
                  <UserDisableToggle
                    userId={user.id}
                    disabled={user.disabled}
                    isSelf={user.id === session?.user.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">No users match that search.</p>
        )}
      </div>
    </div>
  );
}

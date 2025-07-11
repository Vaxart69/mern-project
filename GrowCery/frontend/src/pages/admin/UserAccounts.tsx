import { useEffect, useState } from "react";

interface User {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userType: string;
  totalOrders: number;
}

export default function UserAccounts() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const [usersRes, ordersRes] = await Promise.all([
        fetch("http://localhost:3000/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3000/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [{ users: allUsers }, { orders }] = await Promise.all([
        usersRes.json(),
        ordersRes.json(),
      ]);

      const customers =
        allUsers
          ?.filter((user: any) => user.userType === "customer")
          .map((user: any) => ({
            ...user,
            totalOrders:
              orders?.filter((order: any) => order.userId?._id === user._id)
                .length || 0,
          })) || [];

      setUsers(customers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setDeleting(userToDelete._id);
    setShowDeleteModal(false);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/users/${userToDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== userToDelete._id));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    } finally {
      setDeleting(null);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const getFullName = ({ firstName, middleName, lastName }: User) =>
    `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-xl text-gray-500">Loading customers...</div>
    );

  return (
    <div className="h-full p-8 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">User Accounts</h1>
        <p className="text-gray-700 text-lg">
          Manage all registered users in the system
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center text-2xl text-gray-400 font-semibold">
          No customers found.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["ID", "Full Name", "Email", "Total Orders", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold text-black"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{user._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {getFullName(user)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.totalOrders}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteClick(user)}
                      disabled={deleting === user._id}
                      className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg text-xs flex items-center gap-1 disabled:opacity-50"
                      title="Delete Account"
                    >
                      {deleting === user._id ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl border">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete User Account
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete{" "}
                <strong>{getFullName(userToDelete)}</strong>'s account? This
                action cannot be undone and will permanently remove all user
                data.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

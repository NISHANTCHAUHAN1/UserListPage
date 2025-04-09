import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserCard = ({ user, onClick }) => {
  return (

    <div
  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 border hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white"
  onClick={() => onClick(user)}
>
  <div className="mb-3 flex items-center gap-3">
    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
      {user.name.charAt(0)}
    </div>
    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
  </div>
  <div className="space-y-1 text-sm text-gray-700">
    <p>📧 <span className="font-medium">{user.email}</span></p>
    <p>📞 <span className="font-medium">{user.phone}</span></p>
    <p> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{user.website}</a></p>
  </div>
</div>

  );
};

const UserModal = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return (



    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white/80 shadow-2xl backdrop-blur-lg border border-gray-200 p-6 transition-all duration-300">
      <Dialog.Title className="text-2xl font-bold mb-4 text-center text-gray-800">
        {user.name}'s Details
      </Dialog.Title>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong> Address:</strong> {user.address.street}, {user.address.city}
        </p>
        <p>
          <strong> Company:</strong> {user.company.name}
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onClose}
          className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow hover:brightness-110 transition-all"
        >
          Close
        </button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog>

  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">User List</h1>
        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          Refresh Users
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleCardClick} />
          ))}
        </div>
      )}

      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;

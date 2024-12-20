import React, { useState, useEffect } from "react";
import Axios from "axios";

const MoneyDonation = () => {
  const [moneydonations, setMoneydonationss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMoneydonations, setselectedMoneydonations] = useState(null);

  const token = localStorage.getItem("ngosToken");
  const ngoName = localStorage.getItem("ngoName");

  // Fetch donations from the API
  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/ngosuser/moneydonations", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const sortedDonations = response.data.sort((a, b) => {
            const statusOrder = { Pending: 0, Picked: 1, Collected: 2 };
            return statusOrder[a.status] - statusOrder[b.status];
          });
          setMoneydonationss(sortedDonations);
        })
        .catch((error) => {
          console.error("Error fetching money donations:", error);
          alert("Failed to load donations. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // Handle status update
  const handleStatusChange = (donationId, newStatus) => {
    setMoneydonationss((prevDonations) =>
      prevDonations.map((donation) =>
        donation._id === donationId
          ? { ...donation, status: newStatus, Collectedby: ngoName }
          : donation
      )
    );

    Axios.patch(
      `http://localhost:1000/ngosuser/moneydonations/${donationId}`,
      { status: newStatus, Collectedby: ngoName },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert("Money donation status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating donation status:", error);
        alert("Failed to update donation status. Please try again.");
      });
  };

  // Handle opening and closing modal
  const handleSeeMore = (donation) => setselectedMoneydonations(donation);
  const handleCloseModal = () => setselectedMoneydonations(null);

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider py-4">
      <div className="w-10/12 sm:w-8/12 md:w-10/12 text-sm bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full text-center my-3 p-4 bg-blue-600 text-white">
          <h1 className="text-2xl font-medium">Donations Information</h1>
        </div>

        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : (
          <table className="table-auto w-full my-4">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {moneydonations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No donations found
                  </td>
                </tr>
              ) : (
                moneydonations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{donation.name}</td>
                    <td className="px-4 py-2 border-b">{donation.amount}</td>
                    <td className="px-4 py-2 border-b">
                      {donation.status === "Picked" ? (
                        <span className="text-green-600 font-semibold">Picked</span>
                      ) : donation.status === "Collected" ? (
                        <span className="text-blue-600 font-semibold">Collected</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {donation.status === "Pending" && (
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleStatusChange(donation._id, "Picked")}
                        >
                          Mark as Picked
                        </button>
                      )}
                      {donation.status === "Picked" && (
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleStatusChange(donation._id, "Collected")}
                        >
                          Mark as Collected
                        </button>
                      )}
                      {donation.status === "Collected" && (
                        <span className="text-gray-500">Already Collected</span>
                      )}
                      <br />
                      <button
                        className="text-blue-600 hover:text-blue-800 mt-2"
                        onClick={() => handleSeeMore(donation)}
                      >
                        See More
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Modal for showing detailed donation info */}
        {selectedMoneydonations && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-10/12 sm:w-6/12 md:w-4/12 shadow-xl">
              <div className="text-right">
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  X
                </button>
              </div>
              <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
              <p><strong>Name:</strong> {selectedMoneydonations.name}</p>
              <p><strong>Phone:</strong> {selectedMoneydonations.phone}</p>
              <p><strong>Email:</strong> {selectedMoneydonations.email || 'Not provided'}</p>
              <p><strong>Amount:</strong> {selectedMoneydonations.amount}</p>
              <p><strong>Payment Method:</strong> {selectedMoneydonations.paymentMethod}</p>
              <p><strong>Message:</strong> {selectedMoneydonations.message}</p>
              <p><strong>Address:</strong> {selectedMoneydonations.address}</p>
              <p><strong>Pincode:</strong> {selectedMoneydonations.pincode}</p>
              <p><strong>Status:</strong> {selectedMoneydonations.status}</p>
              <p><strong>Collected By:</strong> {selectedMoneydonations.Collectedby}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyDonation;

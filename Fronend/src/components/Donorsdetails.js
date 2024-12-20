import React, { useState, useEffect } from "react";
import Axios from "axios";

const Donorsdetails = () => {
  const [fooddonations, setFooddonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFooddonation, setSelectedFooddonation] = useState(null);

  const token = localStorage.getItem("adminToken");
  
  

  // Fetch donations from the API
  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/ngosuser/fooddonations", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          // console.log("API response:", response.data); // Debugging
          setFooddonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching food donations:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // Handle status update
  const handleStatusChange = (donationId, newStatus) => {
    setFooddonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation._id === donationId
          ? { ...donation, status: newStatus, Collectedby: ngoName }
          : donation
      )
    );

    Axios.patch(
      `http://localhost:1000/ngosuser/fooddonations/${donationId}`,
      { status: newStatus, Collectedby: ngoName },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert("Food donation status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating donation status:", error);
      });
  };

  // Handle opening and closing modal
  const handleSeeMore = (donation) => setSelectedFooddonation(donation);
  const handleCloseModal = () => setSelectedFooddonation(null);

  // Sort donations by status: Pending, Picked, Collected
  const sortedFooddonations = fooddonations.sort((a, b) => {
    const statusOrder = { Pending: 0, Picked: 1, Collected: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

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
                <th className="px-4 py-2 border-b">Food Type</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedFooddonations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No donations found
                  </td>
                </tr>
              ) : (
                sortedFooddonations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{donation.name}</td>
                    <td className="px-4 py-2 border-b">{donation.foodType}</td>
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
        {selectedFooddonation && (
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
              <p><strong>Name:</strong> {selectedFooddonation.name}</p>
              <p><strong>Phone:</strong> {selectedFooddonation.phone}</p>
              <p><strong>Food Type:</strong> {selectedFooddonation.foodType}</p>
              <p><strong>Quantity:</strong> {selectedFooddonation.quantity}</p>
              <p><strong>Packaging:</strong> {selectedFooddonation.packaging}</p>
              <p><strong>Description:</strong> {selectedFooddonation.description}</p>
              <p><strong>Address:</strong> {selectedFooddonation.address}</p>
              <p><strong>District:</strong> {selectedFooddonation.district}</p>
              <p><strong>State:</strong> {selectedFooddonation.state}</p>
              <p><strong>Pincode:</strong> {selectedFooddonation.pincode}</p>
              <p><strong>Status:</strong> {selectedFooddonation.status}</p>
              <p><strong>Collected By:</strong> {selectedFooddonation.Collectedby}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donorsdetails;

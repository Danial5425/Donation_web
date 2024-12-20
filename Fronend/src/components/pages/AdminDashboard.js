import React, { useState, useEffect } from "react";
import Axios from "axios";

const token = localStorage.getItem("adminToken");

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [foodDonations, setFoodDonations] = useState([]);
  const [clothingDonations, setClothingDonations] = useState([]);
  const [moneyDonations, setMoneyDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(""); // To track which section to show

  useEffect(() => {
    // Fetch donor data
    if (token) {
      Axios.get("http://localhost:1000/admin/donors", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setDonors(response.data);
        })
        .catch((error) => {
          console.error("Error fetching donors:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    // Fetch NGO data
    if (token) {
      Axios.get("http://localhost:1000/admin/ngos", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setNgos(response.data);
        })
        .catch((error) => {
          console.error("Error fetching NGOs:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // Function to delete a donor
  const deleteDonor = (id) => {
    Axios.delete(`http://localhost:1000/admin/donors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setDonors(donors.filter((donor) => donor._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
      });
  };

  // Function to delete an NGO
  const deleteNgo = (id) => {
    Axios.delete(`http://localhost:1000/admin/ngos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setNgos(ngos.filter((ngo) => ngo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting NGO:", error);
      });
  };

  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/admin/fooddonation", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setFoodDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching food donations:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    
  }, [token]);

  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/admin/clothsdonation", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setClothingDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching clothing donations:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // Fetch money donations data
  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/admin/moneydonation", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setMoneyDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching money donations:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);
  
  

  return (
    <div className="flex flex-col  lg:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-full lg:w-1/5 p-4 lg:min-h-screen">
        <div className="space-y-4">
          <button
            onClick={() => setActiveSection("userDetails")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
            User Details
          </button>
          <button
            onClick={() => setActiveSection("ngoDetails")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
            NGO's Details
          </button>
          <button
            onClick={() => setActiveSection("foodDonations")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
           foodDonations Details
          </button>
          <button
            onClick={() => setActiveSection("clothingDonations")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
            Clothsdonation Details
          </button>
          <button
            onClick={() => setActiveSection("moneyDonations")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
            MoneyDonations Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
       
        {activeSection === "userDetails" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Donor Details</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">Email</th>
                    <th className="border border-gray-400 px-4 py-2">Phone</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor) => (
                    <tr key={donor._id}>
                      <td className="border border-gray-400 px-4 py-2">
                        {donor.username}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {donor.email}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {donor.phoneNumber}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <button
                          onClick={() => deleteDonor(donor._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
          </div>
        )}

        {activeSection === "ngoDetails" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">NGO's Details</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">Email</th>
                    <th className="border border-gray-400 px-4 py-2">Phone</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ngos.map((ngo) => (
                    <tr key={ngo._id}>
                      <td className="border border-gray-400 px-4 py-2">
                        {ngo.username}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {ngo.email}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {ngo.phoneno}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <button
                          onClick={() => deleteNgo(ngo._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            )}
          </div>
        )}

        {activeSection === "foodDonations" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Food Donations</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Donor Name</th>
                    <th className="border border-gray-400 px-4 py-2">Food Type</th>
                    <th className="border border-gray-400 px-4 py-2">Quantity</th>
                    <th className="border border-gray-400 px-4 py-2">Collected by</th>
                    <th className="border border-gray-400 px-4 py-2">Address</th>
                    <th className="border border-gray-400 px-4 py-2">Pincode</th>
                    <th className="border border-gray-400 px-4 py-2">Date</th>

                    
                  </tr>
                </thead>
                <tbody>
                  {foodDonations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="border border-gray-400 px-4 py-2">{donation.name}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.foodType}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.quantity}</td>

                      <td className="border border-gray-400 px-4 py-2">
                        {donation.Collectedby || "Pending"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">{donation.address}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.pincode}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.date}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        
        {/* Clothing Donations Section */}
        {activeSection === "clothingDonations" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Clothing Donations</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Donor Name</th>
                    <th className="border border-gray-400 px-4 py-2">Clothing Type</th>
                    <th className="border border-gray-400 px-4 py-2">Quantity</th>
                    <th className="border border-gray-400 px-4 py-2">Collected by</th>
                    <th className="border border-gray-400 px-4 py-2">Address</th>
                    <th className="border border-gray-400 px-4 py-2">Pincode</th>
                    <th className="border border-gray-400 px-4 py-2">Date</th>

                  </tr>
                </thead>
                <tbody>
                  {clothingDonations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="border border-gray-400 px-4 py-2">{donation.name}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.clothingType}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.quantity}</td>
                      <td className="border border-gray-400 px-4 py-2">
                        {donation.Collectedby || "Pending"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">{donation.address}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.pincode}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.date}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        )}
         {/* Money Donations Section */}
         {activeSection === "moneyDonations" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Money Donations</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Donor Name</th>
                    <th className="border border-gray-400 px-4 py-2">Amount</th>
                    <th className="border border-gray-400 px-4 py-2">Date</th>
                    <th className="border border-gray-400 px-4 py-2">Collected by</th>
                    <th className="border border-gray-400 px-4 py-2">Address</th>
                    <th className="border border-gray-400 px-4 py-2">Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {moneyDonations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="border border-gray-400 px-4 py-2">{donation.name}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.amount}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.date}</td>
                      <td className="border border-gray-400 px-4 py-2">
                        {donation.Collectedby || "Pending"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">{donation.address}</td>
                      <td className="border border-gray-400 px-4 py-2">{donation.pincode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

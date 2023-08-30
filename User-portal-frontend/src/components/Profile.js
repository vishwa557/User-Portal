import React, { useState, useEffect } from "react";
import config from "../../src/assets/config/config.js";
import Cookies from "js-cookie";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [editName, setEditName] = useState(false); // State to toggle name editing
  const [newName, setNewName] = useState(""); // State to store new name
  const [editPhoneNumber, setEditPhoneNumber] = useState(false); // State to toggle phone number editing
  const [newPhoneNumber, setNewPhoneNumber] = useState(""); // State to store new phone number
  const [editAddress, setEditAddress] = useState(false); // State to toggle address editing
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  }); 
  const serverUrl = config.serverUrl;

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    // Fetch data from your server
    fetch(`${serverUrl}api/profile/user-details`, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handlePhoneNumberEdit = () => {
    setEditPhoneNumber(true);
    setNewPhoneNumber(userData.user.phoneNumber);
  };

  const handlePhoneNumberSave = () => {
    const accessToken = Cookies.get("access_token");

    fetch(`${serverUrl}api/profile/add-edit-phone`, {
      method: "POST",
      headers: {
     
        Authorization: accessToken,
      },
      body: JSON.stringify({ phoneNumber: newPhoneNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Phone number added/edited successfully") {
          setEditPhoneNumber(false);
          // Refresh user data
          fetch(`${serverUrl}api/profile/user-details`, {
            headers: {
              Authorization: accessToken,
            },
          })
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error("Error fetching data:", error));
        }
      })
      .catch((error) => console.error("Error updating phone number:", error));
  };

  const handleAddressEdit = () => {
    setEditAddress(true);
    setNewAddress({
      street: userData.user.addresses[0].street,
      city: userData.user.addresses[0].city,
      state: userData.user.addresses[0].state,
      postalCode: userData.user.addresses[0].postalCode,
    });
  };

  const handleAddressSave = () => {
    const accessToken = Cookies.get("access_token");

    const { street, city, state, postalCode } = newAddress;

    fetch(`${serverUrl}api/profile/add-edit-address`, {
      method: "POST",
      headers: {
   
        Authorization: accessToken,
      },
      body: JSON.stringify({
        addressId: userData.user.addresses[0]._id,
        street,
        city,
        state,
        postalCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Address added/edited successfully") {
          setEditAddress(false);
          // Refresh user data
          fetch(`${serverUrl}api/profile/user-details`, {
            headers: {
              Authorization: accessToken,
            },
          })
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error("Error fetching data:", error));
        }
      })
      .catch((error) => console.error("Error updating address:", error));
  };

  const handleNameEdit = () => {
    setEditName(true);
    setNewName(userData.user.name);
  };

  const handleNameSave = () => {
    const accessToken = Cookies.get("access_token");

    fetch(`${serverUrl}api/profile/edit-name`, {
      method: "PUT",
      headers: {
        
        Authorization: accessToken,
      },
      body: JSON.stringify({ newName: newName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User name updated successfully") {
          setEditName(false);
          fetch(`${serverUrl}api/profile/user-details`, {

            headers: {
              Authorization: accessToken,
            },
          })
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error("Error fetching data:", error));
        }
      })
      .catch((error) => console.error("Error updating name:", error));
  };

  console.log(newAddress);
  return (
    <div className="user-details">
      <h2>User Details</h2>
      {userData ? (
        <div>
          <div className="user-info">
            {editName ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button onClick={handleNameSave}>Save</button>
              </>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {userData.user.name}
                </p>
                <button onClick={handleNameEdit}>Edit Name</button>
              </>
            )}
            <p>
              <strong>Email:</strong> {userData.user.email}
            </p>

            {editPhoneNumber ? (
              <>
                <input
                  type="text"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <button onClick={handlePhoneNumberSave}>Save</button>
              </>
            ) : (
              <>
                <p>
                  <strong>phoneNumber:</strong> {userData.user.phoneNumber}
                </p>
                <button onClick={handlePhoneNumberEdit}>Edit Phone Number</button>
              </>
            )}
          </div>
          <h3>Address</h3>
          <div className="address-info">
            {userData.user.addresses.length > 0 ? (
              // Display address information
              <>
                {editAddress ? (
                  <>
                    <input
                      type="text"
                      value={newAddress.street || ""}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={newAddress.city || ""}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={newAddress.state || ""}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={newAddress.postalCode || ""}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, postalCode: e.target.value })
                      }
                    />
                    <button onClick={handleAddressSave}>Save</button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Street:</strong> {userData.user.addresses[0].street}
                    </p>
                    <p>
                      <strong>City:</strong> {userData.user.addresses[0].city}
                    </p>
                    <p>
                      <strong>State:</strong> {userData.user.addresses[0].state}
                    </p>
                    <p>
                      <strong>Postal Code:</strong>{" "}
                      {userData.user.addresses[0].postalCode}
                    </p>
                    <button onClick={handleAddressEdit}>Edit Address</button>
                  </>
                )}
              </>
            ) : (
              // No address information available
              <p>No address information available. <button onClick={handleAddressEdit}>Add Address</button></p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;

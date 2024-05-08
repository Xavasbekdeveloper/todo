import React, { useState } from "react";
import "./Form.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "../modal/Modal";

const Form = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [fname, setFname] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [edit, setEdit] = useState(null);
  const [openModal, setopenModal] = useState(false);

  const handleClickModal = () => {
    setopenModal(!openModal);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (edit) {
      let index = users?.findIndex((el) => el.id === edit.id);
      let updateUser = {
        id: edit.id,
        fullName: fname,
        date,
        phoneNumber: +phone,
        address,
        gender,
      };
      let updatedUsers = users;
      updatedUsers.splice(index, 1, updateUser);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEdit(null);
    } else {
      const user = {
        id: new Date().getTime(),
        fullName: fname,
        date,
        phoneNumber: +phone,
        address,
        gender,
      };
      setUsers((prev) => [...prev, user]);
      localStorage.setItem("users", JSON.stringify([...users, user]));
    }

    setFname("");
    setDate("");
    setPhone("");
    setAddress("");
    setGender("");
  };

  const handleEdit = (user) => {
    setEdit(user);
    setFname(user.fullName);
    setDate(user.date);
    setPhone(user.phoneNumber);
    setAddress(user.address);
    setGender(user.gender);
  };

  const handleDelete = (id) => {
    setEdit(null);
    if (confirm("Are you sure you want to delete ?")) {
      let filterUser = users?.filter((user) => user.id !== id);
      setUsers(filterUser);
      localStorage.setItem("users", JSON.stringify(filterUser));
    }
  };

  let user = users?.map((user) => (
    <div key={user.id} className="users__card">
      <div className="users__card__img"></div>
      <div className="users__card__info">
        <h3 className="users__card__title">{user.fullName}</h3>
        <p className="users__card__text">Date: {user.date}</p>
        <p className="users__card__text">Gender: {user.gender}</p>
        <p className="users__card__text">Address: {user.address}</p>
        <p className="users__card__text">Phone: {user.phoneNumber}</p>
        <button className="users__card__btn" onClick={handleClickModal}>
          See More
        </button>
        {openModal && <Modal user={user} handleClickModal={handleClickModal} />}
        <div className="users__card__btns">
          <button onClick={() => handleDelete(user.id)}>
            <MdDelete />
          </button>
          <button onClick={() => handleEdit(user)}>
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="todo">
      <form action="" className="form" onSubmit={handlesubmit}>
        <div className="container">
          <div className="form__group">
            <input
              required
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              type="text"
              placeholder="Enter Your FullName"
            />
            <input
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              placeholder="Enter Your Date"
            />
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Enter Your Phone"
            />
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Your Address"
            />
          </div>
          <div className="form__gender">
            <label htmlFor="gender">Choose Your Gender</label>
            <div className="form__gender-box">
              <div>
                <label htmlFor="male">Male</label>
                <input
                  required
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  id="male"
                  name="gender"
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  required
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  id="female"
                  name="gender"
                />
              </div>
            </div>
          </div>
          <div className="form__btns">
            <button>{edit ? "Save" : "Create"}</button>
          </div>
        </div>
      </form>

      <div className="users">
        <div className="container">
          <div className="users__cards">{user}</div>
        </div>
      </div>
    </section>
  );
};

export default Form;

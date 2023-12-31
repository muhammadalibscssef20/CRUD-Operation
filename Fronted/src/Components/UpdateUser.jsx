import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      location: "",
      age: "",
      preview: "",
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      axios
        .put("http://localhost:4000/users/" + id, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Response: ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    axios.get("http://localhost:4000/users/" + id).then((res) => {
      const user = res.data;
      for (let key in user) {
        if (key == "image") {
          formik.setFieldValue(
            "preview",
            `http://localhost:4000/images/` + user.image.filename
          );
          formik.setFieldValue(key, user[key]);
        } else {
          formik.setFieldValue(key, user[key]);
        }
      }
    });
  }, []);

  const handleImageChange = (e) => {
    console.log("hello");
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    formik.setFieldValue("preview", preview);
    formik.setFieldValue("image", file);
    // formik.setFieldValue("preview", { preview });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="Name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <br />
      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.location}
      />
      <br />
      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        type="file"
        onChange={handleImageChange}
        // value={formik.values.preview}
      />

      <br />
      <img src={formik.values.preview} width={200} alt="" />
      <br />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <br />

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateUser;

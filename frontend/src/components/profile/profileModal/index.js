import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UploadImage } from "../../../redux/actions/uploadAction";
import { UpdateUser } from "../../../redux/actions/UserAction";

function ProfileModal({ openModal, setOpenModal, data }) {
  const { password, ...otherDetails } = data;
  const [formData, setFormData] = useState(otherDetails);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const theme = useMantineTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;

    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name", filename);
      data.append("file", profileImage);
      UserData.profilePicture = filename;
      dispatch(UploadImage(data));
    }
    // try {
    //   dispatch(UploadImage(data));
    // } catch (error) {
    //   console.log(error);
    // }
    if (coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name", filename);
      data.append("file", coverImage);
      UserData.coverPicture = filename;
      try {
        dispatch(UploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(UpdateUser(id, UserData));
    setOpenModal(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      size="35rem"
      overlayBlur={3}
      opened={openModal}
      onClose={() => setOpenModal(false)}
    >
      <form onSubmit={handleSubmit} className="signup">
        <h3>Your Information</h3>
        <div className="names">
          <input
            value={formData?.firstname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          />

          <input
            value={formData?.lastname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            value={formData?.worksAt}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
          />
        </div>

        <div className="names">
          <input
            value={formData?.livesIn}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="LIves in"
          />

          <input
            value={formData?.country}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            value={formData?.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={handleImage} />
          Cover Image
          <input type="file" name="coverImage" onChange={handleImage} />
        </div>

        <button className="btn ">Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModal;

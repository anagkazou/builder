import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DocumentSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, UploadResult } from "firebase/storage";
import { storage } from "../../../firebase";

export interface PageBio {
  name: string | null;
  description: string | null;
  profileImage: any;
  coverImage: any;
}

const initialState: PageBio = {
  name: null,
  description: null,
  profileImage: null,
  coverImage: null,
};

export const uploadProfileImageToFirebase = createAsyncThunk(
  "page-bio/profile-image",
  async () => {
    // if (imageUpload == null) return;
    // const imageRef = ref(storage, `images/${'profile'}`);
    // uploadBytes(imageRef, imageUpload).then((snapshot: UploadResult) => {
    //   getDownloadURL(snapshot.ref).then((url) => {
    //    // setImageUrls((prev): any => [...prev, url]);
    //   });
    // });
  }
);
export const uploadCoverImageToFirebase = createAsyncThunk(
  "page-bio/cover-image",
  async () => {
    return;
  }
);

export const setProfileBioName = createAsyncThunk(
  "page-bio/profile-name",
  async () => {}
);
export const setProfileBioDescription = createAsyncThunk(
  "page-bio/profile-description",
  async () => {}
);

export const ProfileBioSlice = createSlice({
  name: "profile-bio",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(uploadCoverImageToFirebase.fulfilled, (state, action) => {}),
      builder.addCase(uploadCoverImageToFirebase.pending, (state, action) => {}),
      builder.addCase(uploadCoverImageToFirebase.rejected, (state, action) => {}),
      builder.addCase(uploadProfileImageToFirebase.fulfilled, (state, action) => {}),
      builder.addCase(uploadProfileImageToFirebase.pending, (state, action) => {}),
      builder.addCase(uploadProfileImageToFirebase.rejected, (state, action) => {});
    builder.addCase(uploadProfileImageToFirebase.fulfilled, (state, action) => {}),
      builder.addCase(uploadProfileImageToFirebase.pending, (state, action) => {}),
      builder.addCase(uploadProfileImageToFirebase.rejected, (state, action) => {});
  },
  reducers: {
    setProfileName: (state, action) => {
      state.name = action.payload;
    },
    setProfileDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export default ProfileBioSlice.reducer;


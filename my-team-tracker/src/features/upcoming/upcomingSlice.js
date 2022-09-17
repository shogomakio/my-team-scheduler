import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUpcoming } from "./upcomingAPI";
import * as Config from "../../Config/index";
const UpcomingConfig = Config.upcoming;

const initialState = {
  status: "idle",
  movies: {},
  hasMorePages: true,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getUpcoming = createAsyncThunk(
  "upcoming/fetchUpcoming",
  async ({
    language = UpcomingConfig.language,
    page = UpcomingConfig.page,
    region = UpcomingConfig.region,
  }) => {
    const response = await fetchUpcoming({ language, page, region });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const upcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getUpcoming.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpcoming.fulfilled, (state, action) => {
        state.status = "idle";
        const updateMovies = {
          ...state.movies,
          ...action.payload.results,
        }
        state.movies = updateMovies;
        const page = action.payload.page;
        state.page = page;
        state.hasMorePages = page >= action.payload.total_pages ? false: true;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  upcomingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUpcomingMovies = (state) => state.upcoming.movies;
export const selectHasMorePages = (state) => state.upcoming.hasMorePages;
export const selectPage = (state) => state.upcoming.page;

export default upcomingSlice.reducer;
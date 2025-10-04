import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookmark, toggleBookmark } from "../services/bookmarkService";

interface BookmarkState {
  items: Bookmark[];
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await getBookmark(userId);
    } catch (error) {
      return rejectWithValue(`🚨 북마크 불러오기 실패 : ${error}`);
    }
  }
);

export const toggleBookmarkThunk = createAsyncThunk(
  "bookmarks/toggleBookmark",
  async (
    { userId, bookmark }: { userId: string; bookmark: Bookmark },
    { rejectWithValue }
  ) => {
    try {
      const result = await toggleBookmark(userId, bookmark);
      return { bookmark, status: result };
    } catch (error) {
      return rejectWithValue(`🚨 북마크 토글 실패 : ${error}`);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(toggleBookmarkThunk.fulfilled, (state, action) => {
        const { bookmark, status } = action.payload;
        if (status === "added") {
          state.items.push(bookmark);
        } else {
          state.items = state.items.filter((b) => b.id !== bookmark.id);
        }
      });
  },
});

export default bookmarkSlice.reducer;

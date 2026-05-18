import { create } from "zustand";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import dbApi from "db/DB";

// const defaultMovieReviews = [
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "1523145",
//     poster_path: "/iGpMm603GUKH2SiXB2S5m4sZ17t.jpg",
//     writer: "kkt",
//     content: "재미없어요 ㅜㅜ",
//     rating: 1,
//     createdAt: "2026. 4. 1.",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "1327819",
//     poster_path: "/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg",
//     writer: "kkt",
//     content: "완전 재밌어요",
//     rating: 5,
//     createdAt: "2026. 4. 1.",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "687163",
//     poster_path: "/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg",
//     writer: "kkt",
//     content: "재밌었어요ㅎㅎ",
//     rating: 5,
//     createdAt: "2026. 4. 1.",
//   },
// ];

// const defaultWatchList = [
//   {
//     uid: "GIg2QHjCDGcvhBJC9DPiEUSFH1b2",
//     watchList: [
//       { movieId: "83533", poster_path: "/l18o0AK18KS118tWeROOKYkF0ng.jpg" },
//       { movieId: "1226863", poster_path: "/knaXOBDBecVBWZVup3zXaOoy23v.jpg" },
//       { movieId: "1084242", poster_path: "/ib6v6qUXzez1x2qIOLN7C0yJNPQ.jpg" },
//     ],
//   },
// ];

// const defaultLists = [
//   { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', 
//     writer: '김경태',
//     title : '재밌는 영화',
//     desc : '올해 최고로 재밌는 영화',
//     lists: [ { movieId: "1268127", poster_path: '/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg' },
//              { movieId: "1297842", poster_path: '/otP94vckeMXAgQxzhcRkZSeSmYv.jpg' },
//              { movieId: "1327819", poster_path: '/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg' }, ]},
//   { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', 
//     title : '재미없는 영화',
//     writer: '김경태',
//     desc : '올해 최고로 재미없는 영화',
//     lists: [ { movieId: "1265609", poster_path: '/cfeIYPthWgq5XFZnx7cbpr7xFTp.jpg' },
//              { movieId: "1159559", poster_path: '/gqgBqxyr8tGQGJCFrRWAzfA7Cml.jpg' },
//              { movieId: "1171145", poster_path: '/77ggpowGO0ORQY9x33NeBIPajm1.jpg' }, ]},
// ];

// const defaultLikes = [
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "687163",
//     poster_path: "/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "1226863",
//     poster_path: "/knaXOBDBecVBWZVup3zXaOoy23v.jpg",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "1327819",
//     poster_path: "/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "83533",
//     poster_path: "/l18o0AK18KS118tWeROOKYkF0ng.jpg",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "1268127",
//     poster_path: "/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg",
//   },
//   {
//     uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
//     movieId: "1297842",
//     poster_path: "/otP94vckeMXAgQxzhcRkZSeSmYv.jpg",
//   },
// ];

const getResetAuthState = () => ({
  currentUser: null,
  currentUserInfo: null,
  searchResults: [],
  reviewLiked : false,
  userReviews : [],
  toggleWatchBoolen : false,
  toggleWatcgLaterBoolean : false,
  films : [],
  watchList : [],
  lists : [],
  userReviews: null,
  likes : [],
  allLists: [],
});

const useAppStore = create((set, get) => ({
  currentUser: null,
  currentUserInfo: null,

  movieReviews: [],
  userReviews: [],
  films: [],
  // reviews: [],
  watchList: [],
  lists: [],
  allLists: [],
  likes: [],
  reviewLiked: false,
  toggleWatchBoolean : false,
  toggleWatchLaterBoolean : false,

  // searchResults: [],
  // setSearchResults: (results) => set({ searchResults: results }),

  setCurrentUser: (loginUser) => set({ currentUser: loginUser }),
  setCurrentUserInfo: (loginUser) => set({ currentUserInfo: loginUser }),
  resetUserPageData: () =>
    set({
      userReviews: [],
      films: [],
      watchList: [],
      lists: [],
      likes: [],
    }),

  searchResults: [], // 검색 결과를 담을 배열
  setSearchResults: (results) => set({ searchResults: results }),

  setReviewLiked: (value) => set({ reviewLiked: value }),

  setToggleWatchLaterBoolean : (value) => set({toggleWatchLaterBoolean : value}),


  initApp: () => {
    const auth = getAuth();

    // onAuthStateChanged는 인증 상태가 변경될 때마다 실행되는 콜백 함수를 등록함
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) { // 로그인이 되었을 때
        const currentUserInfo = await dbApi.readUserInfo(currentUser.uid);
        const likeLists = await dbApi.getReviewLikes(currentUser.uid);
        const filmLists = await dbApi.getUserFilm(currentUser.uid);
        const watchlists = await dbApi.getToggleWatchLater(currentUser.uid);

        set({
          currentUser,
          currentUserInfo,
          likes : likeLists || [],
          films : filmLists || [],
          watchList : watchlists || [],
        });

        console.log("로그인된 유저 : ", currentUser.uid);
      } else { //로그아웃 되었을 때
        set(getResetAuthState());
        console.log("로그아웃 상태");
      }
    });

    return () => unsubscribe();
  },

  updateUserInfo: async (uid, userInfo) => {
    await dbApi.updateUserInfo(uid, userInfo);

    set((state) => ({
      currentUserInfo: {
        ...state.currentUserInfo,
        ...userInfo,
      },
    }));
  },

  login: async (email, pwd) => {
    try {
      await dbApi.authLogin(email, pwd);
      return true;
    } catch (error) {
      console.error("로그인 실패:", error);
      return false;
    }
  },
  logout: async () => {
    const auth = getAuth();
    set(getResetAuthState());
    await signOut(auth);
  },

  addFilms: async (film) => {
    await dbApi.addDBList(film);

    set((state) => ({
      films: [...(state.films || []), film],
    }));
  },
  getFilms: async (uid) => {
    const films = await dbApi.getUserFilm(uid);

    set(() => ({
      films: films || [],
    }));
  },

  toggleWatchLater: (movie) => {
    const user = get().currentUser;
    if (!user) return;

    const movieId = String(movie.movieId || movie.id);

    set((state) => {
      const safeWatchList = state.watchList || [];
      const targetIndex = safeWatchList.findIndex(
        (item) => item.uid === user.uid
      );

      const movieData = {
        movieId,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
      };

      if (targetIndex === -1) {
        return {
          watchList: [
            ...safeWatchList,
            {
              uid: user.uid,
              watchList: [movieData],
            },
          ],
        };
      }

      const nextWatchList = [...safeWatchList];
      const currentUserWatchList = nextWatchList[targetIndex].watchList || [];

      const exists = currentUserWatchList.some(
        (item) => String(item.movieId) === movieId
      );

      nextWatchList[targetIndex] = {
        ...nextWatchList[targetIndex],
        watchList: exists
          ? currentUserWatchList.filter(
            (item) => String(item.movieId) !== movieId
          )
          : [...currentUserWatchList, movieData],
      };

      return { watchList: nextWatchList };
    });
  },
  toggleWatch: async (toggleWatchBoolen, newFilm) => {
    const toggle = await dbApi.addUserFilm(toggleWatchBoolen, newFilm);

    set(() => ({
      toggleWatchBoolen: toggle
    }));
  },
  checkToggleWatch: async (uid, movieId) => {
    const result = await dbApi.checkToggleFilm(uid, movieId);
    set({ toggleWatchBoolen: result });
  },

  addReview: async (movieReview) => {
    await dbApi.addDBReview(movieReview);

    set((state) => ({
      movieReviews: [...(state.movieReviews || []), movieReview],
    }));
  },
  getMovieReview: async (movieId) => {
    const movieReviews = await dbApi.getDBMovieReview(movieId);

    set(() => ({
      movieReviews: movieReviews || [],
    }));
  },
  getUserReview: async (uid) => {
    const userReviews = await dbApi.getDBUserReview(uid);

    set(() => ({
      userReviews: userReviews || [],
    }));
  },
  updateReview: async (reviewId, nextData) => {
    await dbApi.updateDBReview(reviewId, nextData);

    set((state) => ({
      userReviews: (state.userReviews || []).map((review) =>
        review.id === reviewId ? { ...review, ...nextData } : review
      ),
      movieReviews: (state.movieReviews || []).map((review) =>
        review.id === reviewId ? { ...review, ...nextData } : review
      ),
    }));
  },
  deleteReview: async (reviewId) => {
    await dbApi.deleteDBReview(reviewId);

    set((state) => ({
      userReviews: (state.userReviews || []).filter(
        (review) => review.id !== reviewId
      ),
      movieReviews: (state.movieReviews || []).filter(
        (review) => review.id !== reviewId
      ),
    }));
  },
  addReviewLike: async (currentLiked, likedMovie, uid, movieId) => {
    // DB 업데이트
    const result = await dbApi.addDBReviewLike(currentLiked, likedMovie, uid, movieId);

    set((state) => {
      const currentLikes = state.likes || [];
      const targetMovieId = String(movieId);
      
      // UI 상태도 결과값(toggle 결과)에 맞춰 업데이트
      return {
        reviewLiked: result, // result가 true(추가됨) 또는 false(삭제됨)를 반환해야 함
        likes: !currentLiked // 현재 상태가 '좋아요'였다면 삭제, 아니었다면 추가
          ? [...currentLikes, likedMovie]
          : currentLikes.filter(item => String(item.movieId) !== targetMovieId)
      };
    });
  },
  checkReviewLike: async (uid, movieId) => {
    if (!uid) return;
    const result = await dbApi.checkDBReviewLike(uid, movieId);
    // 단순히 return만 하지 말고 set으로 상태를 저장해야 함
    set({ reviewLiked: !!result });
  },
  // addReviewLike : async(reviewLiked,liked,uid,movieId) => {
  //    const newLiked = await dbApi.addDBReviewLike(reviewLiked,liked,uid,movieId);

  //    set(() => ({
  //     reviewLiked : newLiked
  //    }))
  // },
  // checkReviewLike : async (uid,movieId) => {
  //   const result = await dbApi.checkDBReviewLike(uid, movieId);

  //   set({ reviewLiked: result });
  // },

  addWatchList: async (watchList) => {
    await dbApi.addDBList(watchList);

    set((state) => ({
      watchList: [...(state.watchList || []), watchList],
    }));
  },
  getWatchList: async (uid) => {
    const watchList = await dbApi.getDBUserLists(uid);
    set(() => ({
      watchList: watchList || [],
    }));
  },

  toggleWatchLater: async(uid,movie) => {
    
    await dbApi.addUserWatchLater(uid, movie);

    const result = await dbApi.checkToggleWatchLater(uid, movie.id);

    set({ toggleWatchLaterBoolean: result });

  },
  checkToggleWatchLater : async (uid, movieId) => {
    const result = await dbApi.checkToggleWatchLater(uid, movieId);

    set({toggleWatcgLaterBoolean : result});
  },

  toggleWatch : async (toggleWatchBoolean, newFilm) => {
    const toggle = await dbApi.addUserFilm(toggleWatchBoolean, newFilm);

    set(() => ({
      toggleWatchBoolean : toggle
    }));
  },
  checkToggleWatch : async( uid , movieId ) => {
    const result = await dbApi.checkToggleFilm(uid, movieId);
    
    set({ toggleWatchBoolean: result });
  },
  

    

  addList: async (list) => {
    await dbApi.addDBList(list);

    set((state) => ({
      lists: [...(state.lists || []), list],
    }));
  },
  getUserLists: async (uid) => {
    const userLists = await dbApi.getDBUserLists(uid);

    set(() => ({
      lists: userLists || [],
    }));
  },
  getAllLists: async () => {
    const allLists = await dbApi.getDBAllLists();

    set(() => ({
      allLists: allLists || [],
    }));
  },

  addLikes: async (like) => {
    await dbApi.addDBList(like);

    set((state) => ({
      likes: [...(state.likes || []), like],
    }));
  },
  getLikes: async (uid) => {
    const userLikes = await dbApi.getDBLikes(uid);

    set(() => ({
      likes: userLikes || [],
    }));
  },
}));

export default useAppStore;

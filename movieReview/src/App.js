import './App.css';
import './MovieDetail.css';
import './MovieList.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from 'components/common/Navbar';
import Home from 'pages/common/Home';
import Login from 'pages/common/Login';
import Signup from 'pages/common/Signup';

import MovieList from 'pages/movie/MovieList';
import MovieDetail from 'pages/movie/MovieDetail';
import MovieGenre from 'pages/movie/MovieGenre';
import UserMyPage from 'pages/user/UserMyPage';
import PersonDetail from 'pages/person/PersonDetail';
import useAppStore from 'store/useAppStore';
import UserProfile from 'components/user/UserProfile';
import UserFilms from 'components/user/UserFilms';
import UserReviews from 'components/user/UserReviews';
import UserWatchList from 'components/user/UserWatchList';
import UserLists from 'components/user/UserLists';
import UserLikes from 'components/user/UserLikes';
import UserNewList from 'pages/user/UserNewList';
import ListDetail from "pages/user/ListDetail";
import UserProfileEdit from 'components/user/UserProfileEdit';
import Lists from 'pages/movie/Lists';

function App() {
  const initApp = useAppStore((state) => state.initApp);
    
  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>



        <Route path="/user" element={<UserMyPage/>}>
          <Route path="profile/:id" element={<UserProfile/>}/>
          <Route path='profile/edit' element={<UserProfileEdit/>}/>
          <Route path="films/:id" element={<UserFilms/>}/>
          <Route path="reviews/:id" element={<UserReviews/>}/>
          <Route path="watchlist/:id" element={<UserWatchList/>}/>
          <Route path="lists/:id" element={<UserLists/>}/>
          <Route path="likes/:id" element={<UserLikes/>}/>
        </Route>

        <Route path="/lists" element={<Lists/>}/>
        <Route path="/list/new/" element={<UserNewList/>}/>
        <Route path="/list/:id" element={<ListDetail />} />
        <Route path='/movie' element={<MovieList/>}/>
        <Route path='/movie/:id' element={<MovieDetail/>}/>
        <Route path="/movie/genre/:id" element={<MovieGenre/>}/>
        <Route path='/person/:id' element={<PersonDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

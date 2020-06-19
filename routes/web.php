<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/users', function () {
    return view('users.list');
});
Route::get('/adduser', function () {
    return view('users.create');
});
Route::get('/detailuser', function () {
    return view('users.show');
});
Route::resource('user', 'UserController');
Route::post('/login', 'UserController@login');

Route::get('/courses', function () {
    return view('course.list');
});
Route::get('/addcourse', function () {
    return view('course.create');
});
Route::resource('course', 'CourseController');
Route::get('/getCourseByOwner/{id}', 'CourseController@getCourseByOwner');
Route::get('/getCourseById/{id}', 'CourseController@getCourseById');
Route::get('/detailcourse', function () {
    return view('course.detail');
});

Route::resource('quiz', 'QuizController');
Route::get('/quizs', function(){
    return view('quizs.list');
});
Route::get('/addquiz', function(){
    return view('quizs.create');
});
Route::get('/detailquiz', function(){
    return view('quizs.detail');
});
Route::get('/getQuizById/{id}', 'QuizController@getQuizById');

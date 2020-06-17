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
Route::get('/users', function(){
    return view('users.list');
});
Route::get('/adduser', function(){
    return view('users.create');
});
Route::get('/detailuser', function(){
    return view('users.show');
});

Route::resource('user', 'UserController');
Route::post('/login', 'UserController@login');
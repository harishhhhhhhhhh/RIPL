<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\playerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/getData',[playerController::class,'index']);
Route::get('/getDataBasedOnSkill',[playerController::class,'getDataBasedOnSkill']);
Route::put('/assignTeam',[playerController::class,'assignTeam']);
Route::get('/getDataBasedOnTeam',[playerController::class,'getDataBasedOnTeam']);
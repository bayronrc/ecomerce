<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FamilyController;
use App\Http\Controllers\Admin\Subcategorycontroller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');

Route::resource('families', FamilyController::class);
Route::resource('categories', CategoryController::class);
Route::resource('subcategories', Subcategorycontroller::class);

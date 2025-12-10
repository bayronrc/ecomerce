<?php

use App\Http\Controllers\Admin\FamilyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');

Route::resource('families',FamilyController::class);

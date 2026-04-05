<?php

namespace App\Http\Controllers\Admin;

use App\Models\Subcategory;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class Subcategorycontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategory = Subcategory::with('category.family')->paginate(10);

        return Inertia::render("Admin/subcategories/Index", [
            'subcategories' => $subcategory,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Subcategory $subcategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subcategory $subcategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subcategory $subcategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        //
    }
}

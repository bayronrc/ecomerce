<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Family;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);
        $page = $request->query('page', 1);

        $sortBy = $request->query('sortBy', 'id');
        $sortOrder = $request->query('sortOrder', 'desc');

        $allowedSortFields = ['id', 'name', 'created_at', 'updated_at'];
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'id';
        }

        $sortOrder = in_array($sortOrder, ['asc', 'desc']) ? $sortOrder : 'desc';

        $categories = Category::query()->with('family')
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage, ['*'], 'page', $page)
            ->appends($request->query());

        return Inertia::render('Admin/categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $families = Family::all();

        return Inertia::render('Admin/categories/Create', [
            'families' => $families,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'family_id' => 'required|string|max:30|exists:families,id',
        ], [
            'name.required' => 'No puedes dejar el nombre de la familia vacio',
            'name.max' => 'El nombre es demasiado largo, intenta con algo mas corto',
            'family_id' => 'La familia seleccionada no es valida'
        ]);

        Category::create($request->all());

        return redirect()->route('admin.categories.index')->with('info', 'Categoria Creada con exito');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $families = Family::all();
        return Inertia::render(
            'Admin/categories/Edit',
            [
                'categories' => $category,
                'families' => $families,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'family_id' => 'required|string|max:30|exists:families,id',
        ], [
            'name.required' => 'No puedes dejar el nombre de la categoria vacio',
            'name.max' => 'El nombre es demasiado largo, intenta con algo mas corto',
            'family_id' => 'La familia seleccionada no es valida'
        ]);

        $category->update($request->all());

        return redirect()->route('admin.categories.index')->with('info', 'Categoria actualizada con exito');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        if ($category->subcategories()->count() > 0) {
            session()->flash('swal', [
                'icon' => 'error',
                'title' => '¡Ups!',
                'text' => 'No se puede eliminar la categoria porque tiene subcategorias asociadas'
            ]);

            return redirect()->route('admin.categories.edit', $category);
        }
        $category->delete();

        session()->flash('swal', [
            'icon' => 'success',
            'title' => '¡Bien hecho',
            'texto' => 'Categoria eliminada correctamente'
        ]);

        return redirect()->route('admin.categories.edit', $category);
    }
}

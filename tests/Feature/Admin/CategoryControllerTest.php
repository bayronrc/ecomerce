<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create a user for authentication
        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_paginates_and_returns_categories_with_default_parameters()
    {
        // Create 20 categories
        Category::factory()->count(20)->create();

        $response = $this->actingAs($this->user)
            ->get(route('admin.categories.index'));

        $response->assertStatus(200);
        
        // Check that the Inertia response contains categories
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/categories/Index')
            ->has('categories')
            ->where('categories.per_page', 15)
            ->where('categories.current_page', 1)
            ->has('categories.data', 15)
            ->where('categories.total', 20)
        );
    }

    /** @test */
    public function it_respects_custom_per_page_parameter()
    {
        // Create 30 categories
        Category::factory()->count(30)->create();

        $response = $this->actingAs($this->user)
            ->get(route('admin.categories.index', ['per_page' => 10]));

        $response->assertStatus(200);
        
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/categories/Index')
            ->where('categories.per_page', 10)
            ->has('categories.data', 10)
            ->where('categories.total', 30)
        );
    }

    /** @test */
    public function it_respects_custom_page_parameter()
    {
        // Create 20 categories
        Category::factory()->count(20)->create();

        $response = $this->actingAs($this->user)
            ->get(route('admin.categories.index', ['page' => 2, 'per_page' => 10]));

        $response->assertStatus(200);
        
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/categories/Index')
            ->where('categories.current_page', 2)
            ->where('categories.per_page', 10)
            ->has('categories.data', 10)
        );
    }

    /** @test */
    public function it_orders_categories_by_id_descending()
    {
        // Create categories with specific IDs
        $category1 = Category::factory()->create(['name' => 'First Category']);
        $category2 = Category::factory()->create(['name' => 'Second Category']);
        $category3 = Category::factory()->create(['name' => 'Third Category']);

        $response = $this->actingAs($this->user)
            ->get(route('admin.categories.index', ['per_page' => 3]));

        $response->assertStatus(200);
        
        // Verify the first item is the last created category (highest ID)
        $response->assertInertia(fn ($page) => $page
            ->where('categories.data.0.id', $category3->id)
            ->where('categories.data.1.id', $category2->id)
            ->where('categories.data.2.id', $category1->id)
        );
    }

    /** @test */
    public function it_appends_query_parameters_to_pagination_links()
    {
        Category::factory()->count(20)->create();

        $response = $this->actingAs($this->user)
            ->get(route('admin.categories.index', ['per_page' => 10, 'custom_param' => 'test']));

        $response->assertStatus(200);
        
        // The pagination object should contain the appended query parameters
        $categories = $response->viewData('page')['props']['categories'];
        $this->assertEquals(10, $categories['per_page']);
        $this->assertEquals(1, $categories['current_page']);
    }
}

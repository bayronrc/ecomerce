<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop and recreate foreign keys with cascadeOnDelete
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign(['family_id']);
            $table->foreign('family_id')->references('id')->on('families')->cascadeOnDelete();
        });

        Schema::table('subcategories', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnDelete();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['subcategory_id']);
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->cascadeOnDelete();
        });

        Schema::table('variants', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
        });

        Schema::table('features', function (Blueprint $table) {
            $table->dropForeign(['option_id']);
            $table->foreign('option_id')->references('id')->on('options')->cascadeOnDelete();
        });

        Schema::table('option_product', function (Blueprint $table) {
            $table->dropForeign(['option_id']);
            $table->dropForeign(['product_id']);
            $table->foreign('option_id')->references('id')->on('options')->cascadeOnDelete();
            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to original foreign keys without cascadeOnDelete
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign(['family_id']);
            $table->foreign('family_id')->references('id')->on('families');
        });

        Schema::table('subcategories', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->foreign('category_id')->references('id')->on('categories');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['subcategory_id']);
            $table->foreign('subcategory_id')->references('id')->on('subcategories');
        });

        Schema::table('variants', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->foreign('product_id')->references('id')->on('products');
        });

        Schema::table('features', function (Blueprint $table) {
            $table->dropForeign(['option_id']);
            $table->foreign('option_id')->references('id')->on('options');
        });

        Schema::table('option_product', function (Blueprint $table) {
            $table->dropForeign(['option_id']);
            $table->dropForeign(['product_id']);
            $table->foreign('option_id')->references('id')->on('options');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }
};

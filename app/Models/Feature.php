<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Feature extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'value',
        'description',
        'option_id'
    ];

    public function option(): BelongsTo
    {
        return $this->belongsTo(Option::class);
    }

    public function variants(): BelongsToMany
    {
        return $this->belongsToMany(Variant::class)
            ->withTimestamps();
    }
}

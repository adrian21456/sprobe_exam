<?php

namespace App\Models;

use App\Models\Mods\ModEmployee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends ModEmployee
{
    use HasFactory;

    /**
     * The "booting" method of the model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public array $join = ['department'];

    public function family(): BelongsTo {
        return $this->belongsTo(Family::class, 'family_id', 'family_id');
    }

    public function department(): BelongsTo {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }
    public function file(): HasMany
    {
        return $this->hasMany(File::class, 'employee_id', 'employee_id');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->firstname} {$this->lastname}";
    }

    protected $appends = ['full_name'];

    protected static function boot()
    {
        parent::boot(); // Call the parent boot method to keep other logic intact

        /**
         * Post Loads
         */

        // Event for when the model is created
        static::created(function ($model) {});

        // Event for when the model is retrieved
        static::retrieved(function ($model) {});

        // Event for when the model is updated
        static::updated(function ($model) {});

        // Event for when the model is deleted
        static::deleted(function ($model) {});

        /**
         * Preloads
         */

        // Event for when the model is being saved
        static::saving(function ($model) {});

        // Event for when the model is being updated
        static::updating(function ($model) {});

        // Event for when the model is being created
        static::creating(function ($model) {});

        // Event for when the model is restored (only for soft deletes)
        // static::restoring(function ($model) {
        // });
    }
}

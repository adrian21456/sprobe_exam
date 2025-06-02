<?php

namespace App\Models;

use App\Models\Mods\ModDemo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demo extends ModDemo
{
    use HasFactory;

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot(); // Call the parent boot method to keep other logic intact

        /**
         * Post Loads
         */

        // Event for when the model is created
        static::created(function ($model) {
        });

        // Event for when the model is retrieved
        static::retrieved(function ($model) {
        });

        // Event for when the model is updated
        static::updated(function ($model) {
        });

        // Event for when the model is deleted
        static::deleted(function ($model) {
        });

        /**
         * Preloads
         */

        // Event for when the model is being saved
        static::saving(function ($model) {
        });

        // Event for when the model is being updated
        static::updating(function ($model) {
        });

        // Event for when the model is being created
        static::creating(function ($model) {
        });

        // Event for when the model is restored (only for soft deletes)
        static::restoring(function ($model) {
        });
    }
}

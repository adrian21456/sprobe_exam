<?php

namespace App\Models\Mods;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class ModDemo extends BaseModel
{

    use HasFactory, SoftDeletes;

    public $primaryKey = 'demo_id';
    public $table = 'demo';

    public $fillable = [
        'demo_name',
        'files',
        'status',
        'description',
    ];

    public $casts = [
        'demo_id' => 'integer',
        'demo_name' => 'string',
        'description' => 'string',
        'status' => 'string',
        'files' => 'array',
    ];

    /* START: Extended Properties for Configurator */

    public array $nullable = [
        "description",
        "files"
    ];

    public array $enumerable = [
        "status" => [
            "active",
            "inactive"
        ]
    ];

    public array $files = [
        "files" => ""
    ];

    public array $lengths = [
        "demo_name" => 255,
    ];

    public $defaults = [
        "status" => "active"
    ];

    /* END: Extended Properties for Configurator */

}

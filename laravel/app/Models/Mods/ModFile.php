<?php

namespace App\Models\Mods;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class ModFile extends BaseModel
{

    use HasFactory;
    use SoftDeletes;

    public $primaryKey = 'file_id';
    public $table = 'file';
    public $timestamps = true;

    public $fillable = [
        'file_name', 
		'file_description'
    ];

    public $casts = [
        'file_id' => 'int', 
		'file_name' => 'string', 
		'file_description' => 'string'
    ];

    /* START: Extended Properties for Configurator */

    public array $nullable = [
        'file_name', 
		'file_description'
    ];

    public array $enumerable = [
        
    ];

    public array $files = [
        
    ];

    public array $lengths = [
        
    ];

    public $defaults = [
        
    ];

    /* END: Extended Properties for Configurator */

}

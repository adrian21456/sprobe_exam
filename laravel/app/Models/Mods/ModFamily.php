<?php

namespace App\Models\Mods;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class ModFamily extends BaseModel
{

    use HasFactory;
    use SoftDeletes;

    public $primaryKey = 'family_id';
    public $table = 'family';
    public $timestamps = true;

    public $fillable = [
        'employee_id', 
		'mother_name', 
		'father_name', 
		'spouse_name', 
		'children_count'
    ];

    public $casts = [
        'family_id' => 'int', 
		'employee_id' => 'int', 
		'mother_name' => 'string', 
		'father_name' => 'string', 
		'spouse_name' => 'string', 
		'children_count' => 'string'
    ];

    /* START: Extended Properties for Configurator */

    public array $nullable = [
        'employee_id', 
		'mother_name', 
		'father_name', 
		'spouse_name', 
		'children_count'
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

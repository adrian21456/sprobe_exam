<?php

namespace App\Models\Mods;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class ModDepartment extends BaseModel
{

    use HasFactory;
    use SoftDeletes;

    public $primaryKey = 'department_id';
    public $table = 'department';
    public $timestamps = true;

    public $fillable = [
        'department_name', 
		'department_head', 
		'designation_name'
    ];

    public $casts = [
        'department_id' => 'int', 
		'department_name' => 'string', 
		'department_head' => 'string', 
		'designation_name' => 'string'
    ];

    /* START: Extended Properties for Configurator */

    public array $nullable = [
        'department_name', 
		'department_head', 
		'designation_name'
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

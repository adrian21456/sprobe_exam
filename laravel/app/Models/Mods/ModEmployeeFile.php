<?php

namespace App\Models\Mods;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class ModEmployeeFile extends BaseModel
{

    use HasFactory;
    use SoftDeletes;

    public $primaryKey = 'employee_file_id';
    public $table = 'employee_file';
    public $timestamps = true;

    public $fillable = [
        'file_id', 
		'employee_id', 
		'file_upload', 
		'description'
    ];

    public $casts = [
        'employee_file_id' => 'int', 
		'file_id' => 'int', 
		'employee_id' => 'int', 
		'file_upload' => 'array', 
		'description' => 'string'
    ];

    /* START: Extended Properties for Configurator */

    public array $nullable = [
        'file_id', 
		'employee_id', 
		'file_upload', 
		'description'
    ];

    public array $enumerable = [
        
    ];

    public array $files = [
        'file_upload' => ''
    ];

    public array $lengths = [
        
    ];

    public $defaults = [
        
    ];

    /* END: Extended Properties for Configurator */

}

<?php

namespace App\Models\Mods;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class ModEmployee extends BaseModel
{

    use HasFactory;
    use SoftDeletes;

    public $primaryKey = 'employee_id';
    public $table = 'employee';
    public $timestamps = true;

    public $fillable = [
        'firstname', 
		'middlename', 
		'lastname', 
		'birthdate', 
		'address', 
		'gender', 
		'department_id'
    ];

    public $casts = [
        'employee_id' => 'int', 
		'firstname' => 'string', 
		'middlename' => 'string', 
		'lastname' => 'string', 
		'birthdate' => 'date', 
		'address' => 'string', 
		'gender' => 'string', 
		'department_id' => 'int'
    ];

    /* START: Extended Properties for Configurator */

    public array $nullable = [
        'firstname', 
		'middlename', 
		'lastname', 
		'birthdate', 
		'address', 
		'gender'
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

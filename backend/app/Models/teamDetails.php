<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class teamDetails extends Model
{
    use HasFactory;
    protected $table = 'teamDetails';

    public function players(){
        return $this->hasManyThrough(playerDetails::class,playerTeam::class,'teamid','id','id','playerid');
    }

}

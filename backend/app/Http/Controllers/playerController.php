<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\playerDetails;

class playerController extends Controller
{
    public function index(){
        $players = playerDetails::all();        
        return response()->json($players);
    }

    public function getDataBasedOnSkill(Request $request) {
        $skill = $request->input('skill');

        if( $skill == "Batter")
            $skill = "Batting";
        else if($skill == 'Bowller')
            $skill = "Bowling";
        else if($skill == 'player')
            return response()->json(playerDetails::all());
            
        $players = playerDetails::where('skill', $skill)->get();
        return response()->json($players);
      }

      public function assignTeam(Request $request){
         $teamName = $request->input('teamName');
        
         dd($teamName);
         return response()->json(["mess"=>"sucessfullly updated"]);
      }
      
}

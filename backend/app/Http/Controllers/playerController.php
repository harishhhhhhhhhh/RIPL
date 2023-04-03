<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\playerDetails;
use App\Models\playerTeam;

class playerController extends Controller
{
    public function index(){
        $players = playerDetails::all();        
        return response()->json($players);
    }

    public function check(){
        $players =DB::table('playerdetails as pd')
        ->select('pd.name')
        ->join('playerteam as pt', 'pd.id', '=', 'pt.playerid')
        ->join('teamdetails as td', 'pt.teamid', '=', 'td.id')
        ->where('td.teamName', '=', 'Earth Heros')
        ->get();
        return response()->json($players);
    }

    public function getDataBasedOnTeam(Request $request){
        $team=$request->input('teamName');
        // if($team== "TEAM-4") return response()->json("TEAm--4");
        $players =DB::table('playerdetails as pd')
        ->select('pd.name')
        ->join('playerteam as pt', 'pd.id', '=', 'pt.playerid')
        ->join('teamdetails as td', 'pt.teamid', '=', 'td.id')
        ->where('td.teamName', '=', $team)
        ->get();
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
         $playerId = $request->input('id');

         $player = playerDetails::find($playerId);
         $player->team = $teamName;
         $player->save();
         return response()->json(["mess"=>"sucessfullly updated"]);
      }
      
}

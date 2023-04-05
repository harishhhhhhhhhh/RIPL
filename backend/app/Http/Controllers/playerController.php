<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\playerDetails;

class playerController extends Controller
{
    public function index(){
        $ids = DB::table('playerteam')
            ->pluck('playerid')
            ->toArray();
        $players = DB::table('playerdetails')
            ->select('id','name', 'skill')
            ->whereNotIn('id', $ids)
            ->get();
        return response()->json($players);

    }

    public function getDataBasedOnTeam(Request $request){
        //$team = $request->input('teamName');
        // $teamid = DB::table('teamdetails')
        //     ->where('teamName', $team)
        //     ->pluck('id')
        //     ->first();
        // $playerids = DB::table('playerteam')
        //      ->where('teamid', $teamid)
        //      ->pluck('playerid')
        //      ->toArray();
        // $players = DB::table('playerdetails')
        //    ->whereIn('id', $playerids)
        //    ->select('name', 'skill')
        //    ->get();
        // return response()->json($players);

        $team=$request->input('teamName');
        $players =DB::table('playerdetails as pd')
        ->select('pd.name','pd.skill','td.teamOwners','td.teamCaptain')
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
        else if($skill == "player")
            return $this->index();

        $players = PlayerDetails::where('skill', $skill)
        ->whereNotIn('id', function($query) {
            $query->select('playerid')->from('playerteam');
        })
        ->get(); 
    
        return response()->json($players);
      }

      public function assignTeam(Request $request){
         $teamName = $request->input('teamName');
         $playerId = $request->input('id');
         $teamid=DB::table('teamdetails as td')
         ->select('td.id')
         ->where('td.teamName',$teamName)
         ->get();
         DB::table('playerteam')->insert([
            ['playerid' => $playerId,'teamid' => $teamid[0]->id, 'year'=>'2023','random'=>'2']
        ]);
        
         return response()->json(["Mess" =>"succss inserted"]);
      }

      public function getTeams(){
        $teams=DB::table('teamdetails')
        ->select('teamName')
        ->get();
        return response()->json($teams);
      }
      
}

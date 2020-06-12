<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function show()
    {
        $users = DB::select('select * from users');
        return view('quiz.show', ['users' => $users]);
        // echo ("Show question" . $user);
    }

    public function addQuest()
    {
        $quest = new App\Quiz();
        $quest->quest = "Ahihi";
        $quest->answer = "A";
        $quest->option1 = "A";
        $quest->option2 = "B";
        $quest->option3 = "C";
        $quest->option4 = "D";
        $quest->save();
        echo (" Add Quest Done");
    }

    public function delQuest($id)
    {
    }
}

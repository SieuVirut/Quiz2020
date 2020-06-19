<?php

namespace App\Http\Controllers;

use App\Quizs;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Quizs::get();
        return response()->json($data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $post = Quizs::create($data);
        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Quizs  $quizs
     * @return \Illuminate\Http\Response
     */
    public function show(Quizs $quizs)
    {
        $data = Quizs::where('id', $quizs)->get();
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Quizs  $quizs
     * @return \Illuminate\Http\Response
     */
    public function edit(Quizs $quizs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Quizs  $quizs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Quizs $quizs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Quizs  $quizs
     * @return \Illuminate\Http\Response
     */
    public function destroy(Quizs $quizs)
    {
        //
    }
    public function getQuizById(Request $request)
    {
        $id = $request->id;
        $data = Quizs::where('id', $id)->get();
        return response()->json($data, 200);
    }
}

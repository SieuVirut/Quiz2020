<?php

namespace App\Http\Controllers;

use App\Courses;
use App\Quizs;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Courses::get();
        return response()->json($data, 200);
    }
    public function getCourseByOwner(Request $request)
    {
        $id = $request->id;
        $data = Courses::where('owner', $id)->get();
        return response()->json($data, 200);
    }
    public function getCourseById(Request $request)
    {
        $id = $request->id;
        $data = Courses::where('id', $id)->get();
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
        $post = Courses::create($data);
        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses)
    {
        $data = Courses::where('id', $courses)->get();
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function edit(Courses $courses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Courses $courses)
    {
        $id = $request->id;
        $validatedData = $request->validate([
            'id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'lesson' => 'required',
            'teachers' => 'required',
            'owner' => 'required',
        ]);
        Courses::whereId($id)->update($validatedData);
        return response()->json($validatedData, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function destroy(Courses $courses)
    {
        //
    }
}

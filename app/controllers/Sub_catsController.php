<?php

class Sub_catsController extends BaseController {

	/**
	 * Sub_cat Repository
	 *
	 * @var Sub_cat
	 */
	protected $sub_cat;

	public function __construct(Sub_cat $sub_cat)
	{
		$this->sub_cat = $sub_cat;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$sub_cats = $this->sub_cat->all();

		return View::make('sub_cats.index', compact('sub_cats'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('sub_cats.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();
		$validation = Validator::make($input, Sub_cat::$rules);

		if ($validation->passes())
		{
			$this->sub_cat->create($input);

			return Redirect::route('sub_cats.index');
		}

		return Redirect::route('sub_cats.create')
			->withInput()
			->withErrors($validation)
			->with('message', 'There were validation errors.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$sub_cat = $this->sub_cat->findOrFail($id);

		return View::make('sub_cats.show', compact('sub_cat'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$sub_cat = $this->sub_cat->find($id);

		if (is_null($sub_cat))
		{
			return Redirect::route('sub_cats.index');
		}

		return View::make('sub_cats.edit', compact('sub_cat'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$validation = Validator::make($input, Sub_cat::$rules);

		if ($validation->passes())
		{
			$sub_cat = $this->sub_cat->find($id);
			$sub_cat->update($input);

			return Redirect::route('sub_cats.show', $id);
		}

		return Redirect::route('sub_cats.edit', $id)
			->withInput()
			->withErrors($validation)
			->with('message', 'There were validation errors.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$this->sub_cat->find($id)->delete();

		return Redirect::route('sub_cats.index');
	}

}

<?php

use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;

class DtypesController extends BaseController {

	
	protected $dtype;

	public function __construct(Dtype $dtype)
	{
		$this->dtype = $dtype;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX
	public function index()
	{
		$dtypes = $this->dtype->all();

		return View::make('dtypes.index', compact('dtypes'));
	}

	// CREATE
	public function create()
	{
		return View::make('dtypes.create');
	}

	// STORE
	public function store()
	{
		$result = $this->dtype->store(Input::all());

		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('dtypes.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('dtypes.create')
				->withInput();
		}
	}

	// SHOW($ID)
	public function show($id)
	{
		$dtype = $this->dtype->find($id);
		return View::make('dtypes.show', compact('dtype'));
	}

	// EDIT($ID)
	public function edit($id)
	{
		$dtype = $this->dtype->find($id);

		if (is_null($dtype))
		{
			return Redirect::route('dtypes.index');
		}

		return View::make('dtypes.edit', compact('dtype'));
	}

	// UPDATE ($ID, $INPUT)
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->dtype->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('dtypes.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('dtypes.edit', $id)
				->withInput();
		}
	}

	// DELETE($ID)
	public function destroy($id)
	{
		$result = $this->dtype->destroy($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('dtypes.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('dtypes.show', $id);
		}
	}
}

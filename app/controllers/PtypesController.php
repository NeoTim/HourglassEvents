<?php

use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;

class PtypesController extends BaseController {

	
	protected $ptype;

	public function __construct(Ptype $ptype)
	{
		$this->ptype = $ptype;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX
	public function index()
	{
		$ptypes = $this->ptype->all();

		return View::make('ptypes.index', compact('ptypes'));
	}

	// CREATE
	public function create()
	{
		return View::make('ptypes.create');
	}

	// STORE
	public function store()
	{
		$result = $this->ptype->store(Input::all());

		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('ptypes.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('ptypes.create')
				->withInput();
		}
	}

	// SHOW($ID)
	public function show($id)
	{
		$ptype = $this->ptype->find($id);
		return View::make('ptypes.show', compact('ptype'));
	}

	// EDIT($ID)
	public function edit($id)
	{
		$ptype = $this->ptype->find($id);

		if (is_null($ptype))
		{
			return Redirect::route('ptypes.index');
		}

		return View::make('ptypes.edit', compact('ptype'));
	}

	// UPDATE ($ID, $INPUT)
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->ptype->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('ptypes.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('ptypes.edit', $id)
				->withInput();
		}
	}

	// DELETE($ID)
	public function destroy($id)
	{
		$result = $this->ptype->destroy($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('ptypes.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('ptypes.show', $id);
		}
	}
}

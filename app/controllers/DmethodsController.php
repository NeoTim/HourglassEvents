<?php

use Cox\Storage\Dmethod\DmethodRepositoryInterface as Dmethod;
use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;

class DmethodsController extends BaseController {

	/**
	 * Dmethod Repository
	 *
	 * @var Dmethod
	 */
	protected $dmethod;
	protected $dtype;

	public function __construct(Dmethod $dmethod, Dtype $dtype)
	{
		$this->dmethod = $dmethod;
		$this->dtype = $dtype;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX
	public function index()
	{
		$dmethods = $this->dmethod->all();

		return View::make('dmethods.index', compact('dmethods'));
	}

	// CREATE
	public function create()
	{
		$dtypes = $this->dtype->all();
		return View::make('dmethods.create', compact('dtypes'));
	}

	// STORE
	public function store()
	{
		$result = $this->dmethod->store(Input::all());
		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('dmethods.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('dmethods.create')
				->withInput();
		}
	}

	// SHOW($ID)
	public function show($id)
	{
		
		$dmethod = $this->dmethod->find($id);
		return View::make('dmethods.show', compact('dmethod'));
	}

	// EDIT($ID)
	public function edit($id)
	{
		$dtypes = $this->dtype->all();
		$dmethod = $this->dmethod->find($id);

		if (is_null($dmethod))
		{
			return Redirect::route('dmethods.index');
		}

		return View::make('dmethods.edit', compact('dmethod', 'dtypes'));
	}

	// UPDATE ($ID, $INPUT)
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->dmethod->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('dmethods.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('dmethods.edit', $id)
				->withInput();
		}
	}

	// DELETE($ID)
	public function destroy($id)
	{
		$result = $this->dmethod->destroy($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('dmethods.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('dmethods.show', $id);
		}
	}
}

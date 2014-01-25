<?php

use Cox\Storage\Pmethod\PmethodRepositoryInterface as Pmethod;
use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;

class PmethodsController extends BaseController {

	/**
	 * Pmethod Repository
	 *
	 * @var Pmethod
	 */
	protected $pmethod;
	protected $ptype;

	public function __construct(Pmethod $pmethod, Ptype $ptype)
	{
		$this->pmethod = $pmethod;
		$this->ptype = $ptype;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX
	public function index()
	{
		$pmethods = $this->pmethod->all();

		return $this->pmethod->all();
	}

	// CREATE
	public function create()
	{
		$ptypes = $this->ptype->all();
		return View::make('pmethods.create', compact('ptypes'));
	}

	// STORE
	public function store()
	{
		$result = $this->pmethod->store(Input::all());
		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('pmethods.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('pmethods.create')
				->withInput();
		}
	}

	// SHOW($ID)
	public function show($id)
	{
		
		$pmethod = $this->pmethod->find($id);
		return View::make('pmethods.show', compact('pmethod'));
	}

	// EDIT($ID)
	public function edit($id)
	{
		$ptypes = $this->ptype->all();
		$pmethod = $this->pmethod->find($id);

		if (is_null($pmethod))
		{
			return Redirect::route('pmethods.index');
		}

		return View::make('pmethods.edit', compact('pmethod', 'ptypes'));
	}

	// UPDATE ($ID, $INPUT)
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->pmethod->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('pmethods.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('pmethods.edit', $id)
				->withInput();
		}
	}

	// DELETE($ID)
	public function destroy($id)
	{
		$result = $this->pmethod->destroy($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('pmethods.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('pmethods.show', $id);
		}
	}
}

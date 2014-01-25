<?php

use Cox\Storage\Activity\ActivityRepositoryInterface as Activity;


class ActivitiesController extends BaseController {

	/**
	 * Activity Repository
	 *
	 * @var Activity
	 */
	protected $activity;
	protected $ptype;

	public function __construct(Activity $activity)
	{
		$this->activity = $activity;
		
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	// INDEX
	public function index()
	{
		$activities = DB::table('activities')->orderBy('id', 'desc')->take(300)->get();
		$order_activities = DB::table('activities')->where('section', '=', 'order')
													->orWhere('section', '=', 'entry')
													->orWhere('section', '=', 'production')
													->orderBy('id', 'desc')->take(100)->get();
		$production_activities = DB::table('activities')->where('section', '=', 'production')->orderBy('id', 'desc')->take(100)->get();
		$customer_activities = DB::table('activities')->where('section', '=', 'customer')->orderBy('id', 'desc')->take(100)->get();
		$stores = DB::table('activities')->where('type', '=', 'store')->orderBy('id', 'desc')->take(100)->get();
		$updates = DB::table('activities')->where('type', '=', 'update')->orderBy('id', 'desc')->take(100)->get();
		$deletes = DB::table('activities')->where('type', '=', 'delete')->orderBy('id', 'desc')->take(100)->get();
		return View::make('activities.index', compact('activities', 'orders', 'order_activities', 'production_activities', 'customer_activities', 'stores', 'updates', 'deletes'));
	}

	// CREATE
	public function create()
	{
		
		return View::make('activities.create');
	}

	// STORE
	public function store()
	{
		$result = $this->activity->store(Input::all());
		if ($result['success'])
		{
			
			Session::flash('success', $result['message']);
			return Redirect::route('activities.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('activities.create')
				->withInput();
		}
	}

	// SHOW($ID)
	public function show($id)
	{
		
		$activity = $this->activity->find($id);
		return View::make('activities.show', compact('activity'));
	}

	// EDIT($ID)
	public function edit($id)
	{

		$activity = $this->activity->find($id);

		if (is_null($activity))
		{
			return Redirect::route('activities.index');
		}

		return View::make('activities.edit', compact('activity'));
	}

	// UPDATE ($ID, $INPUT)
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$result = $this->activity->update($id, $input);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('activities.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('activities.edit', $id)
				->withInput();
		}
	}

	// DELETE($ID)
	public function destroy($id)
	{
		$result = $this->activity->destroy($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('activities.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('activities.show', $id);
		}
	}
}

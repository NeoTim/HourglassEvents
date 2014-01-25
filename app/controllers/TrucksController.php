<?php

class TrucksController extends BaseController {

	/**
	 * Truck Repository
	 *
	 * @var Truck
	 */
	protected $truck;

	public function __construct(Truck $truck)
	{
		$this->truck = $truck;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$trucks = $this->truck->all();

		return View::make('trucks.index', compact('trucks'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('trucks.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();
		$validation = Validator::make($input, Truck::$rules);

		if ($validation->passes())
		{
			$truck = $this->truck->create($input);
			return Response::json(array('id' => $truck->id, 'dmethod_id' => $truck->dmethod_id, 'dmethod_name' => $truck->dmethod_name, 'driver' => $truck->driver ));
			//return Redirect::route('trucks.index');
		}
		return Response::json(array('data' => 'did not work'));
		// return Redirect::route('trucks.create')
		// 	->withInput()
		// 	->withErrors($validation)
		// 	->with('message', 'There were validation errors.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show()
	{
		$trucks = $this->truck->all();
		$array = array('trucks' => $trucks);
		return $trucks->toArray();
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$truck = $this->truck->find($id);

		if (is_null($truck))
		{
			return Redirect::route('trucks.index');
		}

		return View::make('trucks.edit', compact('truck'));
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
		$validation = Validator::make($input, Truck::$rules);
		
		$truck = $this->truck->find($id);
		


		if ($validation->passes())
		{
			$truck->update($input);

			return Response::json(array('id' => $truck->id, 'dmethod_id' => $truck->dmethod_id, 'dmethod_name' => $truck->dmethod_name, 'driver' => $truck->driver, 'number' => $truck->number ));
			//return Redirect::route('trucks.show', $id);
		}

			return Response::json(array('error' => 'Please make sure the truck number is not already Selected', 'id' => $truck->id));
		// return Redirect::route('trucks.edit', $id)
		// 	->withInput()
		// 	->withErrors($validation)
		// 	->with('message', 'There were validation errors.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$truck = $this->truck->find($id);
		$truck->delete();

		return Response::json(array('data' => 'Truck was removed'));
	}

}

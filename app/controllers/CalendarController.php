<?php

use Cox\Storage\Order\OrderRepositoryInterface as Order;
use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;

class CalendarController extends BaseController {


	protected $order;
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */

	public function __construct(Order $order, Dtype $dtype)
	{
		$this->order = $order;
		$this->dtype = $dtype;
		//$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		//$this->beforeFilter('auth', array('only' => array('change')));
		//$this->beforeFilter('inGroup:Admins', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}
	public function index()
	{
		$orders = $this->order->all();
		$dtypes = $this->dtype->all();
        return View::make('calendars.calendar', compact('orders', 'dtypes'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        return View::make('calendars.calendar');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show()
	{
		$orders = DB::table('orders')->get();
		$result = array();
		foreach ($orders as $order)
		{
		    $result[] =  array('id' => $order->id, 'title' => $order->title, 'start' => $order->start, 'backgroundColor' => $order->backgroundColor, 'dtype_id' => $order->dtype_id);
		    
		    
		}
		return $result;
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		
        return $this->order->all()->toArray();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$order = $this->order->find($id);
		if(Input::get('droporder'))
		{
			
			$order->start = 0;
			$order->save();
			return Response::json(array('id' => $order['id'], 'title' => $order['title'] , 'start' => $order['start'], 'dtype_id' => $order['dtype_id'], 'backgroundColor' => $order['backgroundColor']));
		}

		if(Input::get('dtype_id'))
		{
			$dtype = $this->dtype->find(Input::get('dtype_id'));
			$order->dtype_id = Input::get('dtype_id');
			$order->backgroundColor = $dtype['color'];

			
			
			$order->title = Input::get('title');
			$order->start = Input::get('start');
			
			$order->save();
			return Response::json(array('title' => $order->title, 'start' => $order->start, 'dtype_id' => $order->dtype_id, 'backgroundColor' => $order->backgroundColor));
		}

		
		
		
		$order->title = Input::get('title');
		$order->start = Input::get('start');
		
		$order->backgroundColor = Input::get('backgroundColor');

		$order->save();
		return Response::json(array('title' => $order->title, 'start' => $order->start, 'backgroundColor' => $order->backgroundColor));
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}

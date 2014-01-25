<?php


use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;
use Cox\Storage\Dmethod\DmethodRepositoryInterface as Dmethod;
use Cox\Storage\Order\OrderRepositoryInterface as Order;


class DeliveriesController extends BaseController {

	public function __construct(Dtype $dtype, Dmethod $dmethod, Order $order, Truck $truck)
	{
		$this->dtype = $dtype;
		$this->dmethod = $dmethod;
		$this->order = $order;
		$this->truck = $truck;

	}

	public function index()
	{
		
		$actives = array(007,11,12,13,14,33,42,88);
		$active = DB::table('trucks')->where('active', '=', '1')
									 ->lists('number');
		$numbers = array_diff($actives, $active);
		$dtypes = $this->dtype->all();
		$dmethods = $this->dmethod->all();
		$trucks = $this->truck->all();
		$orders = $this->order->all();
		$methods = $this->dmethod->listD();
		$ddmethods = DB::table('dmethods')->where('dtype_id', '=', '1')
										->lists('name', 'id');

		
		return View::make('deliveries.index', compact('dtypes', 'dmethods', 'orders', 'trucks', 'methods', 'actives'));
	}

	public function creat()
	{

	}

	public function store()
	{

	}

	public function edit()
	{

	}



	public function update($id)
	{
		if(Input::get('truck_id') == 0)
		{
			$order = $this->order->find($id);
			$order->truck_id = Input::get('truck_id');
			$order->save();
			return Response::json(array('id' => $order->id, 'number' => $order->number, 'position' => $order->position, 'dtype_id' => $order->dtype_id));
		}
		else
		{
			$order = $this->order->find($id);
			$truck = $this->truck->find(Input::get('truck_id'));
			$order->update(Input::all());
			return Response::json(array('number' => $order->number, 'position' => $order->position, 'truck' => $truck['number'], 'dtype_id' => $order->dtype_id));
		}
	}

	public function destroy()
	{

	}


}
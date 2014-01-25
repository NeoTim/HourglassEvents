<?php



use Cox\Storage\Order\OrderRepositoryInterface as Order;
use Cox\Storage\Entry\EntryRepositoryInterface as Entry;
use Cox\Storage\Customer\CustomerRepositoryInterface as Customer;
use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;
use Cox\Storage\Dmethod\DmethodRepositoryInterface as Dmethod;
use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;
use Cox\Storage\Pmethod\PmethodRepositoryInterface as Pmethod;
use Cox\Storage\Product\ProductRepositoryInterface as Product;


class OrdersController extends BaseController {

	/**
	 * Order Cox Repository
	 *
	 * @var Order
	 */
	protected $order;
	protected $entry;
	protected $dtypes;
	public function __construct(
		Order $order,
		Entry $entry,
		Customer $customer,
		Dtype $dtype,
		Dmethod $dmethod,
		Ptype $ptype,
		Pmethod $pmethod,
		Product $product)
	{
		$this->order = $order;
		$this->entry = $entry;
		$this->customer = $customer;
		$this->dtype = $dtype;
		$this->dmethod = $dmethod;
		$this->ptype = $ptype;
		$this->pmethod = $pmethod;
		$this->product = $product;
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
	{	$customers = $this->customer->listCompany();
		$dmethods = $this->dmethod->listName();
		$dtypes = $this->dtype->listDtypes();
		$orders = $this->order->all();

		//return $orders->toArray();
		return $orders->toJson();
		//return View::make('orders.index', compact('orders', 'customers', 'dmethods', 'dtypes'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$customers = $this->customer->listCompany();
		$dmethods = $this->dmethod->listName();
		

		return View::make('orders.create', compact('customers', 'dmethods'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = array_except(Input::all(), array('company', "newname"));
		$result = $this->order->store($input);
		if($result['success'])
		{
			Session::flash('success', 'You Order was Successfully created!!');
			
			return Redirect::route('orders.index');
		}
		else
		{
			Session::flash('error', 'There was an errror creating your order!!');
			return Redirect::route('orders.create')->withInput();	
		}

	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		
		$dmethods = $this->dmethod->listName();
		$ptypes = $this->ptype->all();
		$pmethods = $this->pmethod->all();
		$products = $this->product->listSku();

		$order = $this->order->find($id);
		return View::make('orders.show', compact('order', 'dmethods', 'ptypes', 'pmethods', 'products', 'containers'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$order = $this->order->find($id);
		$customers = $this->customer->listCompany();
		$dmethods = $this->dmethod->listName();
		$dtypes = $this->dtype->all();
		if (is_null($order))
		{
			return Redirect::route('orders.index');
		}

		return View::make('orders.edit', compact('order', 'customers', 'dmethods', 'dtypes'));
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
		$result = $this->order->update($id, $input);

		if ($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::route('orders.show', $id);
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('orders.edit', $id)
				->withInput();
				
				
			
		}

	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$result = $this->order->destroy($id);
		$order = $this->order->find($id);
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			Event::fire(DeleteOrdersEventHandler::EVENT, array($order));
			return Redirect::route('orders.index');
		}
		else
		{
			Session::flash('error', $result['message']);
			return Redirect::route('orders.show', $id);
		}

	}


	public function trash()
	{
		$orders = $this->order->trash();
		return View::make('orders.trash', compact('orders'));
	}

	public function restore($id)
	{
		$result = $this->order->restoreOrder($id);
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::to('trashed/orders');
		}else{
			Session::flash('error', $result['message']);
			return Redirect::to('trashed/orders');
		}
	}

	public function remove($id)
	{
		$result = $this->order->remove($id);
		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::to('trashed/orders');
		}else{
			Session::flash('error', $result['message']);
			return Redirect::to('trashed/orders');
		}
	}

	

}

<?php



use Cox\Storage\Order\OrderRepositoryInterface as Order;
use Cox\Storage\Entry\EntryRepositoryInterface as Entry;
use Cox\Storage\Customer\CustomerRepositoryInterface as Customer;
use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;
use Cox\Storage\Dmethod\DmethodRepositoryInterface as Dmethod;
use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;
use Cox\Storage\Pmethod\PmethodRepositoryInterface as Pmethod;
use Cox\Storage\Product\ProductRepositoryInterface as Product;


class TrashedController extends BaseController {

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


	public function getIndex()
	{
		$orders = $this->order->trash();
		return View::make('trashed.index', compact('orders'));
	}

	public function getOrders()
	{
		$orders = $this->order->trash();
		return View::make('trashed.orders', compact('orders'));	
	}

	public function postRestore($modal, $id)
	{

		$result = $this->$modal->restore($id);

		if($result['success'])
		{
			Session::flash('success', $result['message']);
			return Redirect::to('trashed/' . $modal);
		}else{
			Session::flash('error', $result['message']);
			return Redirect::to('trashed/' . $modal . 's');
		}
	}

	public function postDeleteOrders($id)
	{

	}

	public function postEmptyOrders()
	{

	}






}
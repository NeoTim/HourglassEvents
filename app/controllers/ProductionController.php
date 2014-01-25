<?php

	
use Cox\Storage\Order\OrderRepositoryInterface as Order;
use Cox\Storage\Entry\EntryRepositoryInterface as Entry;
use Cox\Storage\Customer\CustomerRepositoryInterface as Customer;
use Cox\Storage\Dtype\DtypeRepositoryInterface as Dtype;
use Cox\Storage\Dmethod\DmethodRepositoryInterface as Dmethod;
use Cox\Storage\Ptype\PtypeRepositoryInterface as Ptype;
use Cox\Storage\Pmethod\PmethodRepositoryInterface as Pmethod;
use Cox\Storage\Product\ProductRepositoryInterface as Product;
use Cox\Storage\Activity\ActivityRepositoryInterface as Activity;

class ProductionController extends BaseController {


	protected $orders;
	protected $ptypes;
	protected $pmethods;
	protected $dtypes;
	protected $dmethods;
	protected $entry;
	protected $activity;

	public function __construct(
		Order $order,
		Ptype $ptype, 
		Pmethod $pmethod, 
		Dmethod $dmethod, 
		Dtype $dtype,
		Entry $entry,
		Activity $activity
		)
	{

		$this->order = $order;
		$this->ptype = $ptype;
		$this->pmethod = $pmethod;
		$this->dtpye = $dtype;
		$this->dmethod = $dmethod;
		$this->entry = $entry;
		$this->activity = $activity;
		$this->beforeFilter('csrf', array('on' => 'post'));

		// Set up Auth Filters
		$this->beforeFilter('auth', array('only' => array('change')));
		$this->beforeFilter('inGroup:Users', array('only' => array('show', 'index', 'destroy', 'suspend', 'unsuspend', 'ban', 'unban', 'edit', 'update')));
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$orders = $this->order->all();
		$pmethods = $this->pmethod->all();
		$ptypes = $this->ptype->all();
		$entries = DB::table('entries')->orderBy('priority', 'asc')->get();
		//print_r($entries);
       return View::make('productions.index', compact('orders', 'pmethods', 'ptypes', 'entries'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        return View::make('productions.create');
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
	public function show($id)
	{
        return View::make('productions.show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        return View::make('productions.edit');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$entry = $this->entry->find($id);
		$order = $this->order->find($entry['order_id']);
		if(Input::get('status'))
		{

			$entry->status = Input::get('status');
			$entry->color = Input::get('color');
			$entry->save();
		


			
			if(Input::get('status') == '10')
			{
				$message = $entry['sku'] . ' from ' . $order['title'] . ' Is not in production!';
			}
			elseif(Input::get('status') == '25')
			{
				$message = $entry['sku'] . ' from ' . $order['title'] . ' was just moved to production!';
			}
			elseif(Input::get('status') == '50')
			{
				$message = $entry['sku'] . ' from ' . $order['title'] . ' was just sent to the lab!';
			}
			elseif(Input::get('status') == '75')
			{
				$message = 'Production has started filling ' . $entry['sku'] . ' from ' . $order['title'];
			}
			elseif(Input::get('status') == '100')
			{
				$message = $entry['sku'] . ' from ' . $order['title'] . ' Is complete!!!';
			}

			$this->activity->store($entry['sku'], 'Product from Order # ' . $order['number'] . ' updated', $message, 'production', 'update');
		}
		if(Input::get('priority'))
		{
			$entry->priority = Input::get('priority');
			$entry->save();
			$message = $entry['sku'] . ' from ' . $order['title'] . ' set to priority - ' . $entry['priority'];
			$this->activity->store($entry['sku'], 'Product from Order # ' . $order['number'] . ' updated', $message, 'production', 'update');
		}
		Event::fire(UpdateEntriesEventHandler::EVENT, array($entry));
		return Response::json(array(
			'status' => $entry->status,
			'color' => $entry->color,
			'id' => $entry->id, 
			'sku' => $entry['sku'], 
			'batch' => $entry->batch, 
			'tank' => $entry->tank,
			'container1' => $entry->container1,
			'container2' => $entry->container2,
			'container3' => $entry->container3,
			'qty1'	=> $entry->qty1,
			'qty2'	=> $entry->qty2,
			'qty3'	=> $entry->qty3,
			'pmethod_id' => $entry->pmethod_id,
			'priority' => $entry->priority
			));
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
